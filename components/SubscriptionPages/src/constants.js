/**
    
 STEPS: pages that user has access

 Anonymous/New User
    My Plan
    Account ('/subscriptions/account?login=email&isNewUser=true')
    Delivery
    Payment

 Signed In
    My Plan
    Delivery
    Payment
 
 Customer with Delivery and Payment information
     My Plan
     Delivery
     Payment
 
 
 {  id: page id
    name: step name which in this case is same name then route (progress bar is done for accept diff steps name is not married to routes)
    active: check if user can access page
 }
 */
export const NEW_USER_PAGES = [
    {
        id: 'myplan',
        name: '/subscriptions/my-plan',
        active: true,
    },
    {
        id: 'account',
        name: '/subscriptions/account?login=email&isNewUser=true',
        active: true,
    },
    {
        id: 'delivery',
        name: '/subscriptions/delivery',
        active: true,
    },
    {
        id: 'payment',
        name: '/subscriptions/payment',
        active: true,
    },
];

export const USER_LOGGED_IN_PAGES = [
    {
        id: 'myplan',
        name: '/subscriptions/my-plan',
        active: true,
    },
    {
        id: 'delivery',
        name: '/subscriptions/delivery',
        active: true,
    },
    {
        id: 'payment',
        name: '/subscriptions/payment',
        active: true,
    },
];

export const WEEKDAY = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
];
