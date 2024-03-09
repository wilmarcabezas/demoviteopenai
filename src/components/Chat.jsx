import { useEffect, useState } from 'react'
export function Chat() {

    const [libro, setLibro]= useState('');
    const [valorcambio, setValorCambio] = useState(false);
    const [resumenLibro,setResumenLibro]=useState('')

    useEffect(() => {
        fetch('https://api.openai.com/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer API KEY'
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages:[
                    {
                        role:'user',
                        content:'Resume el libro'+libro+' en apenas 20 palabras',
                    }
                ],
                temperature:0.8
            })
        }
        )
            .then(response => response.json())
            .then(data => {
                setResumenLibro(data.choices[0].message.content)
            })
    }, [valorcambio])

    const cargarLibro = (event)=>{
        setLibro(event.target.value)
    }

    const resumir = ()=>{
        setValorCambio(!valorcambio) 
    }


    return (
        <>
            <input type="text" name="" id="" onChange={cargarLibro} />
            <button onClick={resumir}>Resumir</button>
            <p>{resumenLibro}</p>

        </>
    )
}
