function SendIcon({ className }) {
  return (
    <svg width="24" height="24" x="0" y="0" viewBox="0 0 24 24">
      <path
        className={`${className} transform`}  
        d="M22.899 2.243L.2 11.972 22.899 21.7l-.011-7.912-13.623-1.816 13.623-1.817.011-7.912z"
      />
    </svg>
  );
}

export default SendIcon;
