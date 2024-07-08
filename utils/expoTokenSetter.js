import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { myEasId } from '../recoil/atoms/user';

function ExpoTokenSetter({ expoPushToken }) {
  const [expoToken, setExpoToken] = useRecoilState(myEasId);
  useEffect(() => {
    if (expoPushToken) {
      setExpoToken(expoPushToken);
    }
  }, [expoPushToken])

  return (<></>
  );
}

export default ExpoTokenSetter;