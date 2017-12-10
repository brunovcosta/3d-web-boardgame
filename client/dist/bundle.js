(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
System.register(["three", "../vendor/OrbitControls", "./entities"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function mouseMove(evt) {
        var pos = getMouse3D(evt);
        piece.mesh.position.x = pos.x;
        piece.mesh.position.y = pos.y;
        piece.mesh.position.z = 0;
    }
    function init() {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        control = new OrbitControls_1.OrbitControls(camera);
        control.update();
        scene = new THREE.Scene();
        scene.add(table.mesh);
        scene.add(piece.mesh);
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.addEventListener('mousemove', mouseMove, false);
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function getMouse3D(mouseEvent) {
        var x, y;
        //
        if (mouseEvent.offsetX !== undefined) {
            x = mouseEvent.offsetX;
            y = mouseEvent.offsetY;
        }
        else {
            x = mouseEvent.layerX;
            y = mouseEvent.layerY;
        }
        var pos = new THREE.Vector3(0, 0, 0);
        var pMouse = new THREE.Vector3((x / renderer.domElement.width) * 2 - 1, -(y / renderer.domElement.height) * 2 + 1, 1);
        //
        pMouse.unproject(camera);
        var cam = camera.position;
        var m = pMouse.z / (pMouse.z - cam.z);
        pos.x = pMouse.x + (cam.x - pMouse.x) * m;
        pos.z = pMouse.z + (cam.z - pMouse.z) * m;
        pos.y = pMouse.y + (cam.y - pMouse.y) * m;
        return pos;
    }
    function animate() {
        requestAnimationFrame(animate);
        control.update();
        renderer.render(scene, camera);
    }
    function main() {
        init();
        animate();
    }
    exports_1("default", main);
    var THREE, OrbitControls_1, entities_1, camera, control, scene, renderer, tableMesh, table, piece;
    return {
        setters: [
            function (THREE_1) {
                THREE = THREE_1;
            },
            function (OrbitControls_1_1) {
                OrbitControls_1 = OrbitControls_1_1;
            },
            function (entities_1_1) {
                entities_1 = entities_1_1;
            }
        ],
        execute: function () {
            table = new entities_1.Board();
            piece = new entities_1.Piece();
        }
    };
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7SUNnQkEsbUJBQW1CLEdBQWU7UUFDakMsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEO1FBRUMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBRSxDQUFDO1FBQzVGLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEMsT0FBTyxHQUFHLElBQUksNkJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFakIsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTFCLEtBQUssQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFDLElBQUksQ0FBRSxDQUFDO1FBRXhCLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVB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QUFFLENBQUM7UUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7WUFsRkcsS0FBSyxHQUFHLElBQUksZ0JBQUssRUFBRSxDQUFDO1lBQ3BCLEtBQUssR0FBRyxJQUFJLGdCQUFLLEVBQUUsQ0FBQztRQWtGeEIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge09yYml0Q29udHJvbHN9IGZyb20gJy4uL3ZlbmRvci9PcmJpdENvbnRyb2xzJztcbmltcG9ydCB7Qm9hcmQsUGllY2V9IGZyb20gJy4vZW50aXRpZXMnO1xuXG5sZXQgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbmxldCBjb250cm9sOiBPcmJpdENvbnRyb2xzO1xubGV0IHNjZW5lOiBUSFJFRS5TY2VuZVxubGV0IHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xubGV0IHRhYmxlTWVzaDogVEhSRUUuTWVzaDtcblxubGV0IHRhYmxlID0gbmV3IEJvYXJkKCk7XG5sZXQgcGllY2UgPSBuZXcgUGllY2UoKTtcblxuXG5cblxuZnVuY3Rpb24gbW91c2VNb3ZlKGV2dDogTW91c2VFdmVudCl7XG5cdGxldCBwb3MgPSBnZXRNb3VzZTNEKGV2dCk7XG5cdHBpZWNlLm1lc2gucG9zaXRpb24ueCA9IHBvcy54O1xuXHRwaWVjZS5tZXNoLnBvc2l0aW9uLnkgPSBwb3MueTtcblx0cGllY2UubWVzaC5wb3NpdGlvbi56ID0gMDtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcblxuXHRjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDcwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgMTAwMCApO1xuXHRjYW1lcmEucG9zaXRpb24ueiA9IDQwMDtcblx0Y2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLDAsMCkpO1xuXG5cdGNvbnRyb2wgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEpO1xuXHRjb250cm9sLnVwZGF0ZSgpO1xuXG5cdHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cblx0c2NlbmUuYWRkKCB0YWJsZS5tZXNoICk7XG5cblx0c2NlbmUuYWRkKHBpZWNlLm1lc2gpO1xuXG5cdHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcblx0cmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggd2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcblx0cmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXHRyZW5kZXJlci5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsbW91c2VNb3ZlLGZhbHNlKTtcblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCByZW5kZXJlci5kb21FbGVtZW50ICk7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgb25XaW5kb3dSZXNpemUsIGZhbHNlICk7XG59XG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuXHRjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cdHJlbmRlcmVyLnNldFNpemUoIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcbn1cblxuZnVuY3Rpb24gZ2V0TW91c2UzRChtb3VzZUV2ZW50OiBNb3VzZUV2ZW50KSB7XG5cdHZhciB4LCB5O1xuXHQvL1xuXHRpZiAobW91c2VFdmVudC5vZmZzZXRYICE9PSB1bmRlZmluZWQpIHtcblx0XHR4ID0gbW91c2VFdmVudC5vZmZzZXRYO1xuXHRcdHkgPSBtb3VzZUV2ZW50Lm9mZnNldFk7XG5cdH0gZWxzZSB7XG5cdFx0eCA9IG1vdXNlRXZlbnQubGF5ZXJYO1xuXHRcdHkgPSBtb3VzZUV2ZW50LmxheWVyWTtcblx0fVxuXG5cdHZhciBwb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcblx0dmFyIHBNb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IzKFxuXHRcdCh4IC8gcmVuZGVyZXIuZG9tRWxlbWVudC53aWR0aCkgKiAyIC0gMSxcblx0XHQtKHkgLyByZW5kZXJlci5kb21FbGVtZW50LmhlaWdodCkgKiAyICsgMSxcblx0XHQxXG5cdCk7XG5cdC8vXG5cdHBNb3VzZS51bnByb2plY3QoY2FtZXJhKTtcblxuXHR2YXIgY2FtID0gY2FtZXJhLnBvc2l0aW9uO1xuXHR2YXIgbSA9IHBNb3VzZS56IC8gKCBwTW91c2UueiAtIGNhbS56ICk7XG5cblx0cG9zLnggPSBwTW91c2UueCArICggY2FtLnggLSBwTW91c2UueCApICogbTtcblx0cG9zLnogPSBwTW91c2UueiArICggY2FtLnogLSBwTW91c2UueiApICogbTtcblx0cG9zLnkgPSBwTW91c2UueSArICggY2FtLnkgLSBwTW91c2UueSApICogbTtcblxuXHRyZXR1cm4gcG9zO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuXHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGFuaW1hdGUgKTtcblx0Y29udHJvbC51cGRhdGUoKTtcblx0cmVuZGVyZXIucmVuZGVyKCBzY2VuZSwgY2FtZXJhICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1haW4oKXtcblx0aW5pdCgpO1xuXHRhbmltYXRlKCk7XG59XG4iXX0=
