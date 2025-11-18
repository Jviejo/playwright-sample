import { NextRequest, NextResponse } from 'next/server';

// Lista de usuarios en memoria
const validUsers = [
  { username: 'admin', password: 'admin' },
  { username: 'jvh', password: 'jvh' },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validar que se enviaron username y password
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Usuario y password son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario en la lista
    const user = validUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return NextResponse.json(
        { success: true, message: 'Login exitoso' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'usuario no existe' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
