import { Menu } from './menu.model';

export const horizontalMenuItems = [ 
    new Menu (1, 'Home', '/', null, null, false, 0),
    new Menu (2, 'Saved Deals', '/account/my-offers', null, null, false, 0), 
    new Menu (3, 'Browse Local Offers', '/offers', null, null, false, 0),
    new Menu (4, 'Merchants', null, null, null, true, 0), 
    new Menu (5, 'Mission', '/mission', null, null, false, 0),
    new Menu (41, 'Deal Control Panel', '/account/deal-control-panel', null, null, false, 4), 
    new Menu (42, 'Redemption Center', '/account/redemption-center', null, null, false, 4), 
]

export const verticalMenuItems = [ 
    new Menu (1, 'Home', '/', null, null, false, 0),
    new Menu (2, 'Saved Deals', '/account/my-offers', null, null, false, 0), 
    new Menu (3, 'Browse Local Offers', '/offers', null, null, false, 0),
    new Menu (4, 'Merchants', null, null, null, true, 0), 
    new Menu (5, 'Mission', '/mission', null, null, false, 0),
    new Menu (41, 'Deal Control Panel', '/account/deal-control-panel', null, null, false, 4), 
    new Menu (42, 'Redemption Center', '/account/redemption-center', null, null, false, 4), 
]