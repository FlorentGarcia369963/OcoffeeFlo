const burgerMenu = document.querySelector('.burger-menu');
const menuList = document.querySelector('.header-menu-burger-list')
const profileSection = document.querySelector('.profile')

burgerMenu.addEventListener("click", () => {
    menuList.classList.toggle('hidden')
    profileSection.classList.toggle('hidden')
});