export const DefaultAvatar = ({textSize = "text-xl"}) => {
  const username = localStorage.getItem("username");

  return (
    <div className="flex h-full w-full justify-center items-center bg-accent-content">
      <p className={`${textSize} text text-white`}>{username.charAt(0).toUpperCase()}</p>
    </div>
  );
};
