export function switchTheme(theme){
    if(theme === 'dark') {
        document.body.classList.add('dark')
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#171717');
    }
}