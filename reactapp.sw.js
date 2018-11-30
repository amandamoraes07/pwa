function installServiceWorker() {
    console.log('installServiceWorker - ServiceWorker instalado com sucesso!');
}

self.addEventListener("install", installServiceWorker);

var	identification = 'reactapp.sw';
var	version = 1;
var	currentId = identification	+ '-' + version;
var	lastId = identification + '-' + (version - 1);

var	urls = [				
    '/',
    'static/js/bundle.js',
    'favicon.ico',
    'manifest.json',
    '/images/icons/icon-192x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png'
];

function activateServiceWorker() {
    console.log('activateServiceWorker');
    console.log('currentId = ', currentId);
    console.log('lastId = ', lastId);
    caches.open(currentId)
        .then(cache	=>	{
            console.log('Cache Storage ' + currentId + ' foi ativado com sucesso!');
            cache.addAll(urls)
                .then(function(){
                    caches.delete(lastId)
                    console.log('Cache Storage ' + lastId + ' foi excluído!');
            })
    })
}

self.addEventListener("activate", activateServiceWorker);

function fetchApplication(event){
    console.log("fetchApplication");
    event.respondWith(
        caches.match(event.request).then(function(fileCache){
            return fileCache ? fileCache : fetch(event.request);
        })
    )
}

self.addEventListener("fetch",	fetchApplication);