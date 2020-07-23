export class Menu {
    constructor(public id: number,
                public title: string,
                public routerLink: string,
                public href: string, 
                public target: string,
                public hasSubMenu: boolean,
                public parentId: number) { }
} 