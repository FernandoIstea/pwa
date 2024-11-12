
const ISOlangs = []

// <script src="js/speakit.1.1.0.js"></script> // agregar a index.html

// const textoFijo = "Esto es un texto que busco reproducir aprovechando las capacidades de sintetización de voz del navegador web actual."
// const textoFijo = "Quest'è un testo che io voglio ascoltare approfittando le capacità di voce sul proprio web browser."
const textoFijo = "This is a simple sentence that I want to profit to listen to the web browser's speech synthesis features."

const speakButton = document.getElementById('speakButton')
const textToSpeak = document.getElementById('textToSpeak')
const inputRate = document.getElementById('inputRate')
const selectVoice = document.querySelector('select')

function reproducirTexto() {
    textToSpeak.value = textoFijo.trim()
    Speakit.utterancePitch = 1.3
    Speakit.utteranceRate = inputRate.value || 1
    Speakit.lang = selectVoice.value || 'es-MX'
    Speakit.readText(textToSpeak.value.trim(), 
                     Speakit.lang, 
                     'Microsoft GiuseppeMultilingual Online (Natural) - Italian (Italy)')
}

function enumerarVoces() {
    if ('speechSynthesis' in window) { // Obtener las voces disponibles, si Speech Synthesis está disponible
        let synth = speechSynthesis
        let voices = synth.getVoices()
        ISOlangs.push(...voices)
        
        ISOlangs.sort((a, b)=> {
            if (a.iso > b.iso) return 1 
            if (a.iso < b.iso) return -1 
            return 0
        })

        console.table(ISOlangs)
    }
}

// enumerarVoces()

// Verificar si el navegador es compatible con la síntesis de voz
if ('speechSynthesis' in window) {
    const speakButton = document.getElementById('speakButton')
    const textToSpeak = document.getElementById('textToSpeak')
    const inputRate = document.getElementById('inputRate')
    const selectVoice = document.querySelector('select')

    inputRate.addEventListener("change", ()=> {
        inputRate.title = inputRate.value
        document.querySelector("#labelInputRate").textContent = "Velocidad de reproducción: " + inputRate.title
    })

    // selectVoice.addEventListener("change", )

    // Función para hablar el texto
    function speakText() {
        const synthesis = speechSynthesis // instancia del objeto de síntesis de voz
        const utterance = new SpeechSynthesisUtterance() // objeto de síntesis de voz
        
        utterance.text = textToSpeak.value.trim() || textoFijo.trim()
        utterance.pitch = 1.1
        utterance.rate = inputRate.value || 1
        utterance.lang = selectVoice.value || 'es-MX'

        // los eventos se configuran previo a la reproducción de texto a voz
        utterance.addEventListener("start", ()=> console.warn("Reproduciendo texto en formato voz."))
        utterance.addEventListener("end", ()=> console.log("Finalizó la reproducción del texto modelo."))

        synthesis.speak(utterance)
    }

    // Agregar un controlador de eventos al botón
    speakButton.addEventListener('click', ()=> speakText() )
} else {
    alert("La síntesis de voz no es compatible en este navegador.")
}