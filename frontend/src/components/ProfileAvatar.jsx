import PropTypes from 'prop-types';
import React from "react";

function ProfileAvatar({ avatarUrl, username }) {
  ProfileAvatar.propTypes = {
    avatarUrl: PropTypes.string,
    username: PropTypes.string
  };
  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src={avatarUrl || `https://ui-avatars.com/api/?name=${username}&background=222&color=fff&size=128`}
        alt="Avatar"
        className="rounded-full shadow-lg w-32 h-32 border-4 border-blue-700"
      />
      <div className="mt-2 text-lg font-bold text-blue-300">{username}</div>
    </div>
  );
}

export default ProfileAvatar;
