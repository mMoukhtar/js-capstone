const Header = () => {
    return `
        <header id="header" class="header">
            <div id="overlay" class="overlay has-fade"></div>
            ${Nav()}
            ${Menu()}
        </header>`;
};

const Nav = () => {
    return `
        <nav class="flex flex-ai-c flex-jc-sb">
            <h1 class="header__title">Travel Planner</h1>
            <a id= "toggleButton" class="header__toggle hide-for-desktop" href="#">
                <span></span>
                <span></span>
                <span></span>
            </a>
            <div class="header__links hide-for-mobile">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>
        </nav>
    `;
};

const Menu = () => {
    return `
        <div id="menu" class="header__menu has-fade">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
        </div>
    `;
};

export default Header;
