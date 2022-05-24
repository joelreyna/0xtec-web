import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { collection, addDoc } from "firebase/firestore"; 
import db from "../../firebase";
import './Sugerencias.css'

const Sugerencias = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const onSubmit = async data => {
    await addDoc(collection(db, "sugerencias"), 
    { ...data,
      fecha: new Date()
    });
  };

  return (
  <>
  <h1> Caja de sugerencias </h1>{" "}
  <form className="formSugerencias" onSubmit={handleSubmit(onSubmit)}>
    <label>Nombre:</label>
    <input type="text" {...register("nombre", {required: true})} aria-invalid="true" />
    {errors.nombre && errors.nombre.type === "required" && <span>El nombre es obligatorio</span>}

    <label>Email:</label>
    <input type="text" {...register("email", {required: true, pattern: /^\S+@\S+$/i})}/> 
    {errors.email && errors.email.type === "required" && <span>El email es obligatorio</span>}
    {errors.email && errors.email.type === "pattern" && <span>El email no es válido</span>}

    <label>Tipo:</label>
    <select {...register("tipo", {required: true})}>
      <option value="">Seleccionar...</option>
      <option value="sugerencia">Sugerencia</option>
      <option value="tema">Tema</option>
      <option value="retroalimentacion">Retroalimentacion</option>
    </select>
    {errors.tipo && errors.tipo.type === "required" && <span>El tipo es obligatorio</span>}

    <label>Mensaje:</label>
    <textarea {...register("mensaje", {required: true})} />
    {errors.mensaje && errors.mensaje.type === "required" && <span>El mensaje es obligatorio</span>}

    <input type="submit" value="Enviar" />
  </form>
  </>
  );
 };

export default Sugerencias;