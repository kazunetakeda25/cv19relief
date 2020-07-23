import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Offer } from 'src/app/app.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent implements OnInit {
  @ViewChild('addressAutocomplete') addressAutocomplete: ElementRef;
  private sub: any;
  public offer:Offer;
  public submitForm:FormGroup;
  public features = [];
  public offerTypes = [];
  public offerStatuses = [];
  public cities = [];
  public neighborhoods = [];
  public streets = [];
  public lat: number = 40.678178;
  public lng: number = -73.944158;
  public zoom: number = 12; 
  constructor(public appService:AppService, 
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private mapsAPILoader: MapsAPILoader, 
              private ngZone: NgZone,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.features = this.appService.getFeatures();
    this.offerTypes = this.appService.getOfferTypes();
    this.offerStatuses = this.appService.getOfferStatuses();
    this.cities = this.appService.getCities();
    this.neighborhoods = this.appService.getNeighborhoods();
    this.streets = this.appService.getStreets();   

    this.submitForm = this.fb.group({
      basic: this.fb.group({
        title: [null, Validators.required],
        desc: null,
        priceDollar: null,
        priceEuro: null,
        offerType: [null, Validators.required],
        offerStatus: null, 
        gallery: null
      }),
      address: this.fb.group({
        location: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: '',
        neighborhood: '',
        street: ''
      }),
      additional: this.fb.group({
        bedrooms: '',
        bathrooms: '',
        garages: '',
        area: '',
        yearBuilt: '',
        features: this.buildFeatures()
      }),
      media: this.fb.group({
        videos: this.fb.array([ this.createVideo() ]),
        plans: this.fb.array([ this.createPlan() ]), 
        additionalFeatures: this.fb.array([ this.createFeature() ]),
        featured: false
      })
    }); 
 
    this.placesAutocomplete();
    
    this.sub = this.activatedRoute.params.subscribe(params => {   
      this.getOfferById(params['id']); 
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public getOfferById(id){
    this.appService.getOfferById(id).subscribe(data=>{
      console.log(data)
      this.offer = data;

      this.submitForm.controls.basic.get('title').setValue(this.offer.title);
      this.submitForm.controls.basic.get('desc').setValue(this.offer.desc);
      this.submitForm.controls.basic.get('priceDollar').setValue((this.offer.priceDollar.sale)?this.offer.priceDollar.sale:this.offer.priceDollar.rent);
      this.submitForm.controls.basic.get('priceEuro').setValue((this.offer.priceEuro.sale)?this.offer.priceEuro.sale:this.offer.priceEuro.rent);
      this.submitForm.controls.basic.get('offerType').setValue( this.offerTypes.filter(p => p.name == this.offer.offerType)[0]);
      
      const statusList: any[] = []; 
      this.offerStatuses.forEach(status =>{
        this.offer.offerStatus.forEach(name=>{
          if(status.name == name){
            statusList.push(status);
          }
        })       
      })
      this.submitForm.controls.basic.get('offerStatus').setValue(statusList);

      const images: any[] = [];
      this.offer.gallery.forEach(item=>{
        let image = {
          link: item.medium,
          preview: item.medium
        }
        images.push(image);
      })
      this.submitForm.controls.basic.get('gallery').setValue(images);

      this.submitForm.controls.address.get('location').setValue(this.offer.formattedAddress);  
      this.lat = this.offer.location.lat;
      this.lng = this.offer.location.lng; 
      this.getAddress();
       
      this.submitForm.controls.additional.get('bedrooms').setValue(this.offer.bedrooms);  
      this.submitForm.controls.additional.get('bathrooms').setValue(this.offer.bathrooms);  
      this.submitForm.controls.additional.get('garages').setValue(this.offer.garages);  
      this.submitForm.controls.additional.get('area').setValue(this.offer.area.value);
      this.submitForm.controls.additional.get('yearBuilt').setValue(this.offer.yearBuilt);
      this.features.forEach(feature =>{
        this.offer.features.forEach(name=>{
          if(feature.name == name){
            feature.selected = true;
          }
        })       
      })
      this.submitForm.controls.additional.get('features').setValue(this.features);

      
      const videos = this.submitForm.controls.media.get('videos') as FormArray;
      while (videos.length) {
        videos.removeAt(0);
      }
      this.offer.videos.forEach(video => videos.push(this.fb.group(video)));

      const plans = this.submitForm.controls.media.get('plans') as FormArray;
      while (plans.length) {
        plans.removeAt(0);
      }     
      this.offer.plans.forEach(plan => {      
        let p = {
          id: plan.id,
          name: plan.name, 
          desc: plan.desc,
          area: plan.area.value,
          rooms: plan.rooms,
          baths: plan.baths, 
          image: null 
        }
        plans.push(this.fb.group(p))        
      }); 
      this.offer.plans.forEach((plan, index) => { 
        let image = {
          link: plan.image,
          preview: plan.image
        }
        this.submitForm.controls.media.get('plans')['controls'][index].controls.image.setValue([image]);
      })
        
      const additionalFeatures = this.submitForm.controls.media.get('additionalFeatures') as FormArray;
      while (additionalFeatures.length) {
        additionalFeatures.removeAt(0);
      }
      this.offer.additionalFeatures.forEach(feature => additionalFeatures.push(this.fb.group(feature)));

      this.submitForm.controls.media.get('featured').setValue(this.offer.featured);         
       
    });
  }



  
  // -------------------- Address ---------------------------  
  public onSelectCity(){
    this.submitForm.controls.address.get('neighborhood').setValue(null, {emitEvent: false});
    this.submitForm.controls.address.get('street').setValue(null, {emitEvent: false});
  }
  public onSelectNeighborhood(){
    this.submitForm.controls.address.get('street').setValue(null, {emitEvent: false}); 
  }

  private setCurrentPosition() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => { 
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude; 
      });
    }
  }
  private placesAutocomplete(){ 
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.addressAutocomplete.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => { 
          let place: google.maps.places.PlaceResult = autocomplete.getPlace(); 
          if (place.geometry === undefined || place.geometry === null) {
            return;
          };
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng(); 
          this.getAddress();
        });
      });
    });
  } 
  
   
  public getAddress(){    
    this.appService.getAddress(this.lat, this.lng).subscribe(response => { 
      let address = response['results'][0].formatted_address; 
      this.submitForm.controls.address.get('location').setValue(address); 
      this.setAddresses(response['results'][0]); 
    })
  }
  public onMapClick(e:any){
    this.lat = e.coords.lat;
    this.lng = e.coords.lng; 
    this.getAddress();
  }
  public onMarkerClick(e:any){
    console.log(e);
  }
  
  public setAddresses(result){
    this.submitForm.controls.address.get('city').setValue(null);
    this.submitForm.controls.address.get('zipCode').setValue(null);
    this.submitForm.controls.address.get('street').setValue(null); 

    var newCity, newStreet, newNeighborhood;
    
    result.address_components.forEach(item =>{
      if(item.types.indexOf('locality') > -1){  
        if(this.cities.filter(city => city.name == item.long_name)[0]){
          newCity = this.cities.filter(city => city.name == item.long_name)[0];
        }
        else{
          newCity = { id: this.cities.length+1, name: item.long_name };
          this.cities.push(newCity); 
        }
        this.submitForm.controls.address.get('city').setValue(newCity);    
      }
      if(item.types.indexOf('postal_code') > -1){ 
        this.submitForm.controls.address.get('zipCode').setValue(item.long_name);
      }
    });

    if(!newCity){
      result.address_components.forEach(item =>{
        if(item.types.indexOf('administrative_area_level_1') > -1){  
          if(this.cities.filter(city => city.name == item.long_name)[0]){
            newCity = this.cities.filter(city => city.name == item.long_name)[0];
          }
          else{
            newCity = { 
              id: this.cities.length+1, 
              name: item.long_name 
            };
            this.cities.push(newCity); 
          }
          this.submitForm.controls.address.get('city').setValue(newCity);    
        } 
      });
    }

    if(newCity){
      result.address_components.forEach(item =>{ 
        if(item.types.indexOf('neighborhood') > -1){ 
          let neighborhood = this.neighborhoods.filter(n => n.name == item.long_name && n.cityId == newCity.id)[0];
          if(neighborhood){
            newNeighborhood = neighborhood;
          }
          else{
            newNeighborhood = { 
              id: this.neighborhoods.length+1, 
              name: item.long_name, 
              cityId: newCity.id 
            };
            this.neighborhoods.push(newNeighborhood);
          }
          this.neighborhoods = [...this.neighborhoods];
          this.submitForm.controls.address.get('neighborhood').setValue([newNeighborhood]); 
        }  
      })
    }

    if(newCity){
      result.address_components.forEach(item =>{            
        if(item.types.indexOf('route') > -1){ 
          if(this.streets.filter(street => street.name == item.long_name && street.cityId == newCity.id)[0]){
            newStreet = this.streets.filter(street => street.name == item.long_name && street.cityId == newCity.id)[0];
          }
          else{
            newStreet = { 
              id: this.streets.length+1, 
              name: item.long_name, 
              cityId: newCity.id, 
              neighborhoodId: (newNeighborhood) ? newNeighborhood.id : null 
            };
            this.streets.push(newStreet);
          }          
          this.streets = [...this.streets];
          this.submitForm.controls.address.get('street').setValue([newStreet]); 
        }
      })
    }

  }

  
  // -------------------- Additional ---------------------------  
  public buildFeatures() {
    const arr = this.features.map(feature => { 
      return this.fb.group({
        id: feature.id,
        name: feature.name,
        selected: feature.selected
      });
    })   
    return this.fb.array(arr);
  }
  

  
  // -------------------- Media --------------------------- 
  public createVideo(): FormGroup {
    return this.fb.group({
      id: null,
      name: null, 
      link: null 
    });
  }
  public addVideo(): void {
    const videos = this.submitForm.controls.media.get('videos') as FormArray;
    videos.push(this.createVideo());
  }
  public deleteVideo(index) {
    const videos = this.submitForm.controls.media.get('videos') as FormArray;
    videos.removeAt(index);
  }
  
  public createPlan(): FormGroup {
    return this.fb.group({
      id: null,
      name: null, 
      desc: null,
      area: null,
      rooms: null,
      baths: null,
      image: null
    });
  }
  public addPlan(): void {
    const plans = this.submitForm.controls.media.get('plans') as FormArray;
    plans.push(this.createPlan());
  }
  public deletePlan(index) {
    const plans = this.submitForm.controls.media.get('plans') as FormArray;
    plans.removeAt(index);
  } 


  public createFeature(): FormGroup {
    return this.fb.group({
      id: null,
      name: null, 
      value: null 
    });
  }
  public addFeature(): void {
    const features = this.submitForm.controls.media.get('additionalFeatures') as FormArray;
    features.push(this.createFeature());
  }
  public deleteFeature(index) {
    const features = this.submitForm.controls.media.get('additionalFeatures') as FormArray;
    features.removeAt(index);
  } 



  public step = 0;
  setStep(index: number) {
    this.step = index;
  }
  onSubmitForm(form){
    if(this.submitForm.get(form).valid){
      this.nextStep();
      if(form == "media"){
        this.snackBar.open('The offer "' + this.offer.title + '" has been updated.', '×', {
          verticalPosition: 'top',
          duration: 5000 
        }); 
      }
    }
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }



}
