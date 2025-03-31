### Chatbot:
cursor

## Prompt 1:
Eres un desarrollador backend experto en el diseño de APIs RESTful siguiendo los principios de DDD (Domain-Driven Design), SOLID y DRY. Implementa el siguiente endpoint con TypeScript, asegurando separación de responsabilidades y una arquitectura escalable.

Endpoint:
GET /positions/:id/candidates

###Requerimientos:
Este endpoint debe recuperar todos los candidatos en proceso para una determinada posición, obteniendo la siguiente información:

Nombre completo del candidato (de la tabla Candidate).
current_interview_step: en qué fase del proceso se encuentra el candidato (de la tabla Application).
Puntuación media del candidato, calculada como el promedio de los score de todas las entrevistas (Interview) asociadas a su aplicación.

###Especificaciones técnicas:
1.Arquitectura basada en DDD:
Implementa una capa de dominio con entidades y agregados.

2.Principios SOLID:
Aplica Single Responsibility Principle (SRP) separando lógica de negocio.
Usa Dependency Injection (DI) para desacoplar dependencias.

3.Buenas prácticas en el código:
Usa TypeScript con tipado fuerte.
Implementa validaciones y manejo de errores adecuados (por ejemplo, 404 Not Found si la posición no existe).
Usa DTOs (Data Transfer Objects) para estructurar la respuesta de la API.

Ten en cuenta la estructura del proyecto @backend , controller, services, model

## Prompt 2:
De acuerdo al contexto, ¿puedes ingresar datos a las tablas para realizar pruebas?

# Prompt 3:
Generar el nuevo endpoint:
PUT /candidates/:id/stage

Descripción:
Este endpoint actualizará la fase actual del proceso de entrevista de un candidato específico.

Requerimientos:
-Recibe un candidateId en la URL y un stage en el cuerpo de la solicitud.
-Valida que el candidato y su aplicación existan.
-Actualiza la fase del proceso en la tabla Application.
-Devuelve la información actualizada del candidato.

Adicionalo al controller de candidatos y su respectivo service

# Prompt 4:
Valida el flujo del nuevo servicio /candidates/:id/stage, ya que genera error 

# Prompt 5:
Docuemnta el código