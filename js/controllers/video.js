var app=angular.module('app');

app.controller('VideoController', function($scope,$routeParams,$location,$localStorage) {
    $scope.tipo_user=$localStorage.datosUser.tipo_user;
var nombre_sala=$localStorage.nombre_room;
$location.hash($localStorage.hash);
console.log(nombre_sala);

  // ......................................................
            // .......................UI Code........................
            // ......................................................
            document.getElementById('open-room').onclick = function() {
                disableInputButtons();
                connection.open(document.getElementById('room-id').value, function() {
                    showRoomURL(connection.sessionid);
                });
            };
            document.getElementById('join-room').onclick = function() {
                disableInputButtons();
                connection.join(document.getElementById('room-id').value);
            };
            // ......................................................
            // ................FileSharing/TextChat Code.............
            // ......................................................
            document.getElementById('share-file').onclick = function() {
                var fileSelector = new FileSelector();
                fileSelector.selectSingleFile(function(file) {
                    connection.send(file);
                });
            };
            document.getElementById('input-text-chat').onkeyup = function(e) {
                if (e.keyCode != 13) return;
                // removing trailing/leading whitespace
                this.value = this.value.replace(/^\s+|\s+$/g, '');
                if (!this.value.length) return;
                connection.send(this.value);
                appendDIV(this.value);
                this.value = '';
            };
            var chatContainer = document.querySelector('.chat-output');
            function appendDIV(event) {
                var div = document.createElement('div');
                div.innerHTML = event.data || event;
                chatContainer.insertBefore(div, chatContainer.firstChild);
                div.tabIndex = 0;
                div.focus();
                document.getElementById('input-text-chat').focus();
            }
            // ......................................................
            // ..................RTCMultiConnection Code.............
            // ......................................................
            var connection = new RTCMultiConnection();
            connection.socketMessageEvent = 'firebase-demo';
            connection.setCustomSocketHandler(FirebaseConnection);
            connection.firebase = 'webrtc-experiment';
            connection.enableFileSharing = true; // by default, it is "false".
            connection.session = {
                audio: true,
                video: true,
                data: true
            };
            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            };
            connection.videosContainer = document.getElementById('videos-container');
            connection.onstream = function(event) {
                connection.videosContainer.appendChild(event.mediaElement);
                event.mediaElement.play();
                setTimeout(function() {
                    event.mediaElement.play();
                }, 5000);
            };
            connection.onmessage = appendDIV;
            connection.filesContainer = document.getElementById('file-container');
            connection.onopen = function() {
                document.getElementById('share-file').disabled = false;
                document.getElementById('input-text-chat').disabled = false;
            };
            function disableInputButtons() {
                connection.channel = document.getElementById('room-id').value;
                document.getElementById('open-room').disabled = true;
                document.getElementById('join-room').disabled = true;
                document.getElementById('room-id').disabled = true;
            }
            // ......................................................
            // ......................Handling Room-ID................
            // ......................................................
            function showRoomURL(roomid) {
                var roomHashURL = '#' + roomid;
                var roomQueryStringURL = '?roomid=' + roomid;
                var html = '<h2>Unique URL for your room:</h2><br>';
                html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
                html += '<br>';
                html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';
                var roomURLsDiv = document.getElementById('room-urls');
                roomURLsDiv.innerHTML = html;
                roomURLsDiv.style.display = 'block';
            }
            (function() {
                var params = {},
                    r = /([^&=]+)=?([^&]*)/g;
                function d(s) {
                    return decodeURIComponent(s.replace(/\+/g, ' '));
                }
                var match, search = window.location.search;
                while (match = r.exec(search.substring(1)))
                    params[d(match[1])] = d(match[2]);
                window.params = params;
            })();
            var roomid = '';
            if (localStorage.getItem(connection.socketMessageEvent)) {
                roomid = localStorage.getItem(connection.socketMessageEvent);
            } else {
                roomid = connection.token();
            }
            document.getElementById('room-id').value = roomid;
            document.getElementById('room-id').onkeyup = function() {
                localStorage.setItem(connection.socketMessageEvent, this.value);
            };
            var hashString = location.hash.replace('#', '');
            if(hashString.length && hashString.indexOf('comment-') == 0) {
              hashString = '';
            }
            var roomid = params.roomid;
            if(!roomid && hashString.length) {
                roomid = hashString;
            }
            if(roomid && roomid.length) {
                document.getElementById('room-id').value = roomid;
                localStorage.setItem(connection.socketMessageEvent, roomid);
                disableInputButtons();
                // auto-join-room
                connection.join(roomid);
            }
            
   $scope.startSala = function () {
    ServiciosRooms.startRoom().start({idtemas:$localStorage.idtemas}).$promise.then(function(data){
        console.log(data);
       });
    };

    $scope.stopSala = function () {
       ServiciosRooms.stopRoom().stop({idtemas:$localStorage.idtemas}).$promise.then(function(data){
        if (data.respuesta) {
          var url='/home/VideoCall';
          $location.path(url);
        }
       });
    }

    $scope.pauseSala = function () {
       ServiciosRooms.pausaRoom().pausar({idtemas:$localStorage.idtemas}).$promise.then(function(data){
        if (data.respuesta) {
          var url='/home/VideoCall';
          $location.path(url);
        }
       });
    }

});