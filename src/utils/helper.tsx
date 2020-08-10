import * as React from 'react';
import { objectType } from 'types';

const AVATAR_COLORS = [
  '232, 105, 156',
  '255, 198, 115',
  '128, 128, 255',
  '105, 232, 194',
  '234, 255, 128',
];

const AVATAR_OPACITY = 0.4;

type NotificationPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export const redirectToMeeting = (
  domain: string,
  roomCode: string,
  roomToken: string,
  target: string = '_self',
) => {
  const url = domain + '/' + roomCode + '?jwt=' + roomToken;
  window.open(url, target);
};

export const cleanObject = <T extends objectType>(object: T) => {
  const newObj = Object.assign({}, object);
  Object.keys(newObj).forEach((key: string) => {
    if (newObj[key] === '' || newObj[key] === undefined || newObj[key] === null)
      delete newObj[key];
  });
  return newObj;
};

export const isEmail = (email: string) => {
  const re: RegExp = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};

export const isMobileAndTablet = () => {
  // NOTE: case special: Ipad Pro
  var ratio = window.devicePixelRatio || 1;
  var screen = {
    width: window.screen.width * ratio,
    height: window.screen.height * ratio,
  };
  return (
    navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i,
    ) ||
    (screen.width === 2048 && screen.height === 2732) ||
    (screen.width === 2732 && screen.height === 2048) ||
    (screen.width === 1536 && screen.height === 2048) ||
    (screen.width === 2048 && screen.height === 1536)
  );
};

export const getInitialLetterName = (s: string) => {
  let strs = s.split(' ');
  let result: string[] = [];
  strs.reverse().forEach(item => {
    result.length < 2 && result.push(item.substr(0, 1).toUpperCase());
  });
  return result.join('');
};

export function getAvatarColor(initials?: string) {
  let colorIndex = 0;
  if (initials) {
    let nameHash = 0;
    for (const s of initials) {
      nameHash += s.codePointAt(0) || 0;
    }
    colorIndex = nameHash % AVATAR_COLORS.length;
  }
  return `rgba(${AVATAR_COLORS[colorIndex]}, ${AVATAR_OPACITY})`;
}

export function _decodeRoomURI(url: string) {
  let roomUrl = url;

  // we want to decode urls when the do not contain space, ' ', which url encoded is %20
  if (roomUrl && !roomUrl.includes('%20')) {
    roomUrl = decodeURI(roomUrl);
  }

  // Handles a special case where the room name has % encoded, the decoded will have
  // % followed by a char (non-digit) which is not a valid URL and room name ... so we do not
  // want to show this decoded
  if (roomUrl.match(/.*%[^\d].*/)) {
    return url;
  }

  return roomUrl;
}
