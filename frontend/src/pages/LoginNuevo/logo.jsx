function Logo() {
    return (
      <div style={{ display: "block", width: 300, padding: 20 }}>
        <img src={require('../../assets/img-prod/logo.png')} className='img-fluid logo' alt='...' />
      </div>
    );
  }
export default Logo;