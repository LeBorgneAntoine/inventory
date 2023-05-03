import { useRef } from "react";
import BottomSheet from "../components/BottomSheet";
import Button from "../components/Button";
import Icon from '@heroicons/react/24/solid'
import FolderSheet from "../components/FolderSheet";
export default function ComponentTest(){

    let sheetControl = useRef()




    let files = []
    let folder = []


    return <div>

        <Button process={(finished) => {

            sheetControl.current.show()

            setTimeout(() => finished({
                text: 'Envoyé !',
                Icon: Icon.CheckCircleIcon
            }), 3000)

        }} Icon={Icon.ArrowUpCircleIcon}>Envoyer</Button>


        <BottomSheet stateControl={sheetControl} startHeight={100} >
            <Button >Click !</Button>
        </BottomSheet>







        <FolderSheet />

    </div>
}
