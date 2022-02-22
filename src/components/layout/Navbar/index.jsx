const Navbar = () => {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <img src="AM-logo.jpg" width="150" height="20" />

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/">
                <p class="title">Covid Dashboard</p>
            </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
