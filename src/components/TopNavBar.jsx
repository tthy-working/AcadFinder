export default function TopNavBar() {


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary position-fixed top-0" style={{left: '80px', right: 0, zIndex: 999}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-1 me-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#"  style={{cursor: 'pointer'}}>
                 <p className="fs-3">Log Out</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        </>
    )
}