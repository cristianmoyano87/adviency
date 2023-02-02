import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { VolumeMuteFill, VolumeUpFill } from "react-bootstrap-icons";

export const Music = () => {
  const [playing, setPlaying] = useState(false)

  const operation = () => {
    setPlaying(!playing)
    const musica = document.getElementById("musica")
    if(playing===true) {
        musica.pause()
    } else {
        musica.play()
    }
  }

  return(
    <>
    <audio id="musica">
        <source src="jingle-bells-christmas-hip-hop-128137.mp3"/>
    </audio>
    <Button variant="link fs-3 text-danger" onClick={operation} title={playing===true?"stop":"play"}>
      {playing===true?<VolumeMuteFill/>:<VolumeUpFill/>}
    </Button>
    </>
  )
}