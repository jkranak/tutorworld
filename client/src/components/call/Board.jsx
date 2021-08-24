import { useEffect } from 'react';
import io from 'socket.io-client';

const Board = () => {

    const CONNECTION_PORT = process.env.REACT_APP_API_URL || '';

    let timeout;
    const socket = io(CONNECTION_PORT, { transports : ['websocket'] });

    let ctx = { 
        strokeStyle: '#000000',
        lineWidth: '3'
    };
    let isDrawing = false;


    socket.on("canvas-data", function(data){

        var interval = setInterval(function(){
            if(isDrawing) return;
            isDrawing = true;
            clearInterval(interval);
            var image = new Image();
            var canvas = document.querySelector('#board');
            var ctx = canvas.getContext('2d');
            image.onload = function() {
                ctx.drawImage(image, 0, 0);

                isDrawing = false;
            };
            image.src = data;
        }, 200)
    });


    useEffect(() => {
        drawOnCanvas();
    }, [])


    const drawOnCanvas= () => {
        var canvas = document.querySelector('#board');
        ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);


        /* Drawing on Paint App */
        ctx.lineWidth = '3';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            if(timeout !== undefined) clearTimeout(timeout);
            timeout = setTimeout(function(){
                var base64ImageData = canvas.toDataURL("image/png");
                socket.emit("canvas-data", base64ImageData);
            }, 1000)
        };
    }
    return (
        <div className="sketch" id="sketch">
            <canvas className="board" id="board"></canvas>
        </div>
    )
}

export default Board