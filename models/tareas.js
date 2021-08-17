
const Tarea = require('./tarea');
/**
 * _listado:
 *  {"uuid-123123123-123123-12:{id:12,desc:asd,completadoEn:2323}"}
 */

class Tareas{
    _Listado = {};
    get listadoArr(){
        
        const listado =[]
        Object.keys(this._Listado).forEach(key=>{
            // console.log(key);
            const tarea = this._Listado[key]
            listado.push(tarea)
        })
        return listado
    }
    constructor(){
        this._Listado = {}
    }

    borrarTarea(id=""){
        if(this._Listado[id]){
            delete this._Listado[id];
        }
    }

    cargarTareasFromArray (tareas = []){
        
        tareas.forEach(tarea =>{
            this._Listado[tarea.id] = tarea;
        })

    }
    crearTarea(desc =""){

        const tarea = new Tarea(desc)
        this._Listado[tarea.id] = tarea
    }
    listadoCompleto(){
        this.listadoArr.forEach((tarea,i)=>{
            const idx = `${i+1}`.green;
            const {desc,completadoEn} = tarea
            const estado =(completadoEn)?"Completada".green:"pendiente".red;
            console.log(`${idx} ${desc } :: ${estado} `)

        })
    }

    listarPendientesCompletadas(completadas = true){
        let counter = 0;
        this.listadoArr.forEach((tarea)=>{

            const {desc,completadoEn} = tarea
            const estado =(completadoEn)?"Completada".green:"pendiente".red;
            if(completadas){
                if(completadoEn){
                    counter +=1;
                    console.log(`${counter.toString().green}. ${desc } :: ${completadoEn} `)
                }
            }else {
                if(!completadoEn){
                    counter +=1;
                    console.log(`${counter.toString().green}. ${desc } :: ${estado} `)
                }      
            }

        })
    }
    toggleCompletadas(ids=[]){
        ids.forEach(id=>{
            const tarea = this._Listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn=new Date().toISOString();
            }
        })
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                 this._Listado[tarea.id].completadoEn = null;
            }
        })
    }
}


module.exports = Tareas;