import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import mock from 'src/utils/mock';
import wait from 'src/utils/wait';
import {getUserAccountParameter}  from 'src/Api/index';

const JWT_SECRET = 'devias-top-secret-key';
const JWT_EXPIRES_IN = '2 days';

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/images/avatars/avatar_6.png',
    canHire: false,
    country: 'USA',
    email: 'demo@devias.io',
    isPublic: true,
    name: 'Katarina Smith',
    password: 'Password123',
    phone: '+40 777666555',
    role: 'admin',
    state: 'New York',
    tier: 'Premium'
  }
];

mock.onPost('/api/account/login').reply(async (config) => {
  try {
    // await wait(1000);

    const { userPayload : user } = JSON.parse(config.data);
    console.log(user,"Login Payload");
    const accessToken = jwt.sign(
      { userId: user.userGlobalId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    let userAvatar = '/static/images/avatars/avatar_6.png';
    return [200, {
      accessToken,
      user: {
        id: user.userGlobalId,
        userId:user.userGlobalId,
        avatar: userAvatar,
        email: user.userEmail,
        firstName: user.userFirstName, 
        lastName: user.userLastName,
        fullName:`${user.userFirstName} ${user.userLastName}`,
        phone:user.userPhoneNumber,
        userAcountBalance:user.userAccountBalance,
        tier: "Premium"
      }
    }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('/api/account/register').reply(async (config) => {
  try {
    const { email, firstName, lastName, mobile, password, userId,userAcountBalance} = JSON.parse(config.data);
    console.log(config.data,"let see oooo")

   let user = {
      id: uuidv4(),
      avatar: null,
      canHire: false,
      country: null,
      email,
      lastName,
      isPublic: true,
      firstName,
      password,
      phone: mobile,
      role: 'admin',
      state: null,
      tier: 'Standard',
      userId,
      userAcountBalance
    };

    const accessToken = jwt.sign(
      { userId: user.userId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return [200, {
      accessToken,
      user: {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        phone:user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName:`${user.firstName} ${user.lastName}`,
        tier: user.tier,
        userId:user.userId,
        userAcountBalance:user.userAcountBalance,
      }
    }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/account/me').reply(async (config) => {
  try {
    console.log(config,"From Where....")
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }
  
    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET); 
    console.log("VZT", userId);
    let payload ={
      orgId:"725550",
      userId:userId,
    }
    let userResponse = await getUserAccountParameter(payload)
    if(userResponse.data.responseCode=="01")
    {
      return [401, { message: 'Invalid authorization token' }];
    }
    let user = userResponse.data.responseData;
    console.log(user,".....")
    return [200, {
      user: {
        id: user.userGlobalId,
        userId:user.userGlobalId,
        // avatar: user.avatar,
        email: user.userEmail,
        firstName: user.userFirstName, 
        lastName: user.userLastName,
        fullName:`${user.userFirstName} ${user.userLastName}`,
        phone:user.userPhoneNumber,
        userAcountBalance:user.userAccountBalance,
        // tier: user.tier,
      }
    }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/account/settings').reply(200, {
  settings: {}
});

mock.onGet('/api/account/subscription').reply(200, {
  subscription: {
    name: 'Premium',
    price: 29,
    currency: '$',
    proposalsLeft: 12,
    templatesLeft: 5,
    invitesLeft: 24,
    adsLeft: 10,
    hasAnalytics: true,
    hasEmailAlerts: true
  }
});
