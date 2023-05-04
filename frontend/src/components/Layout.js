import Navbar from "./Navbar";

function Layout(props) {
  return (
    <div className="container">
      <Navbar />
      {props.children}
    </div>
  );
}

export default Layout;
