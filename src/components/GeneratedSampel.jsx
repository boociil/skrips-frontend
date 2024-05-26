
function GeneratedSampel(props) {
    const total = props.total
    const row = Math.ceil(total/2)
    const id = props.id
    const isi = props.isi

    const elements = []

    for (let index = 1; index <= total; index++) {
        const col = () => {
            if (index % 2 === 0){
                return 2
            }else{
                return 1
            } 
        }
        let the_value = ''
        if (isi && isi[id] && isi[id][index]){
            the_value = isi[id][index]
        }else{
            
        }

        elements.push(
            <div key={index} className={`col-start-${col} bg-[#F5F4F4] mx-1 my-1 p-2 rounded-lg`}>
                Ruta {index}
                <input type="text" 
                className="krt ml-10 rounded-md min-h-8 text-center" 
                placeholder="Kepala Rumah Tangga"
                value={the_value || ''}
                onChange={(event) => props.onChange(event,props.id,index)}
                />
            </div>
            
        )
    }
    return (
        <div className="grid grid-cols-2 text-xs">
            {elements}
        </div>
    )
}


export default GeneratedSampel;

