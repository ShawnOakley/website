import SceneManager from './SceneManager';

export default (containerElement, sceneName) => {
    const canvas = createCanvas(document, containerElement);
    const sceneManager = new SceneManager(canvas, sceneName);

    bindEventListeners();
    render();

    function createCanvas(document, containerElement) {
        const canvas = document.createElement('canvas');
        containerElement.appendChild(canvas);
        return canvas;
    }

    function bindEventListeners() {
        try {
            window.onResize = resizeCanvas;
            window.addEventListener('resize', resizeCanvas, false );    
            resizeCanvas();
        }
        catch(err) {
            console.log(err)
          }        
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        sceneManager.onWindowResize();        
    }

    function render(time){
        requestAnimationFrame(render);
        sceneManager.update();
    }

}