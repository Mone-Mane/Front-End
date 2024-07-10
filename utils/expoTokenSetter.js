import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { myEasId, myPrefix } from '../recoil/atoms/user';

function ExpoTokenSetter({ expoPushToken, prefix }) {
  const [expoToken, setExpoToken] = useRecoilState(myEasId);
  const [myPr, setMyPr] = useRecoilState(myPrefix);
  useEffect(() => {
    if (expoPushToken) {
      setExpoToken(expoPushToken);
    }
  }, [expoPushToken])
  useEffect(() => {
    if (prefix) {
      setMyPr(prefix);
    }
  }, [prefix])

  return (<></>
  );
}

export default ExpoTokenSetter;