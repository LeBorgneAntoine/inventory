import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react"

async function getMedia(constraints) {
    let stream = null;
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
    } catch (err) {
      /* handle the error */
    }
}


export default function QrCodeReader(){

    async function openQr(){

        

        const html5QrcodeScanner = new Html5QrcodeScanner('qrScanner', {
            fps: 60,
            disableFlip: false,
        }, true);

        html5QrcodeScanner.render(alert, () => {

        });

    }

    useEffect(() => {

        openQr()
      
    }, [])

    return <div id="qrScanner">
        
    </div>


}