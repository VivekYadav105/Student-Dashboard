import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface userInterface {
  name: string;
  studentId: string;
  class: string;
  contact: string;
  email: string;
  parent: string;
  parentContact: string;
  address: string;
  userID?: string;
}

interface UserContextProps {
  user: userInterface | null;
  updateUser: (i: userInterface) => void;
  demoLogin: () => Promise<boolean | Error>;
  logOut: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = props => {
  const [user, setUser] = useState<userInterface | null>(null);
  const [initializing, setInitializing] = useState(true);

  function updateUser(i: userInterface) {
    setUser(i);
    if (initializing) {
      setInitializing(false);
    }
  }

  function demoLogin() {
    return new Promise<boolean | Error>((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword('amit.patel@example.com', '1234567890')
        .then(async data => {
          console.log(data);
          await fetchUserDetails(data.user.uid);
          console.log('user logged in successfully');
          return resolve(true);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  function logOut() {
    console.log('insisde');
    auth()
      .signOut()
      .then(data => {
        console.log(data);
        setUser(null);
      })
      .catch(err => console.log(err));
  }

  const fetchUserDetails = async userID => {
    try {
      console.log(userID);
      if (userID) {
        const querySnapshot = await firestore()
          .collection('users')
          .where('userID', '==', userID)
          .get();

        if (querySnapshot.size > 0) {
          const userData = querySnapshot.docs[0].data() as
            | userInterface
            | undefined;
          if (userData) {
            updateUser(userData);
          }
          console.log('User data:', userData);
        } else {
          console.log('User not found');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserAuthStateChanged = async existingUser => {
    if (existingUser) {
      const userRef = firestore().collection('users').doc(existingUser.uid);
      const userSnapshot = await userRef.get();
      if (userSnapshot.exists) {
        const userData = userSnapshot.data() as userInterface | undefined;
        if (userData) {
          updateUser(userData);
        }
      }
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleUserAuthStateChanged);
    console.log(user);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UserContext.Provider value={{user, updateUser, demoLogin, logOut}}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext) as UserContextProps;
