import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { AlertError } from "../../../../utils/alert-error/alert-error";
import { FormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../../home/pages/services/usuarios.service';
@Component({
  selector: 'usuarios-modal',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, AlertError],
  templateUrl: './usuarios-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosModal {
  // acciones de el modal
  @ViewChild('modalUserCheckbox') modalUserCheckbox!: ElementRef<HTMLInputElement>;

  close() {
    this.modalUserCheckbox.nativeElement.checked = false;
  }
  // ================================================================================================================
  // injectar el servicio de usuarios
  usuariosService = inject(UsuariosService);
  selectedUser = this.usuariosService.selectedUser;
  updateorCreate = this.usuariosService.update_or_create;
  // ================================================================================================================
  fb = inject(FormBuilder);
  hasError = signal(false);
  // vizualizar la contraseña
  showPassword = signal(false);
  togglePassword() {
    this.showPassword.update(v => !v);
  }

  addUsuarioForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    imagen: [null as File | null], // Solución al error de asignación
    salary: [0, [Validators.required, Validators.min(0)]]
  });

  imagePreview = signal<string | null>(null);
  // obtener el usuario seleccionado para editar
  selectedUsuario = this.usuariosService.selectedUser;
  createorUpdate = this.usuariosService.update_or_create;
  constructor() {
    // El effect detecta cambios en el Signal automáticamente
    effect(() => {
      const usuario = this.usuariosService.selectedUser();
      if (usuario) {
        this.addUsuarioForm.patchValue({
          name: usuario.name,
          email: usuario.email,
          password: '', // Por seguridad, no se muestra la contraseña
          imagen: null, // No se asigna la imagen al formulario
          salary: Number(usuario.salary) || 0
        });
        this.imagePreview.set(usuario.imagen || null); // Asumiendo que el backend devuelve una URL de la imagen
      } else {
        this.addUsuarioForm.reset();
        this.imagePreview.set(null);
      }
    })
  }


  // ================================================================================================================

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      // Ahora permitirá guardar el archivo sin errores de tipo
      this.addUsuarioForm.patchValue({
        imagen: file
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    if (this.updateorCreate() === 0) {
      // Lógica para actualizar el usuario (a implementar)

      if (this.addUsuarioForm.invalid) {
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
        return;
      }
      const { name = '', email = '', password = '', imagen = null, salary = 0 } = this.addUsuarioForm.value;
      this.usuariosService.createUsuario(name!, email!, password!, imagen!, salary!);
      this.addUsuarioForm.reset();
      this.imagePreview.set(null);
      this.close();
      setTimeout(() => {
        this.usuariosService.resetIsSuccess();
      }, 2000);
    }
    else if (this.updateorCreate() === 1) {
      // Lógica para crear el usuario (a implementar)

      if (this.addUsuarioForm.invalid) {
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
        return;
      }
      const { name = '', email = '', password = '', imagen = null, salary = 0 } = this.addUsuarioForm.value;
      const id = this.selectedUsuario()?.id || 0; // Asegúrate de que el ID esté disponible
      this.usuariosService.updateUsuario(id, name!, email!, password!, imagen!, salary!);
      this.close();
      setTimeout(() => {
        this.usuariosService.resetIsSuccess();
      }, 2000);
    }
  }
}
