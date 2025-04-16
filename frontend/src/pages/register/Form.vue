<template>
  <BRow>
    <BForm @submit="onSubmit">
      <BFormGroup label="Your Name:" label-for="input-1">
        <BFormInput id="input-1" v-model="form.name" placeholder="Enter name" required/>
        <BAlert v-model="v$.name.$error" variant="danger" dismissible>
          <p v-for="error in v$.name.$errors">
            {{ error.$message }}
          </p>
        </BAlert>
      </BFormGroup>

      <BFormGroup label="Your Last Name:" label-for="input-2">
        <BFormInput id="input-2" v-model="form.lastName" placeholder="Enter last name" required/>
        <BAlert v-model="v$.lastName.$error" variant="danger" dismissible>
          <p v-for="error in v$.lastName.$errors">
            {{ error.$message }}
          </p>
        </BAlert>
      </BFormGroup>

      <BFormGroup label="Your Email:" label-for="input-3">
        <BFormInput id="input-3" v-model="form.email" placeholder="Enter email" required/>
        <BAlert v-model="v$.email.$error" variant="danger" dismissible>
          <p v-for="error in v$.email.$errors">
            {{ error.$message }}
          </p>
        </BAlert>
      </BFormGroup>

      <BFormGroup label="Your Document:" label-for="input-4">
        <BFormInput id="input-4" v-model="form.document" placeholder="Enter document" required/>
        <BAlert v-model="v$.document.$error" variant="danger" dismissible>
          <p v-for="error in v$.document.$errors">
            {{ error.$message }}
          </p>
        </BAlert>
      </BFormGroup>

      <BFormGroup label="Your Phone:" label-for="input-5">
        <BFormInput id="input-5" v-model="form.phone" placeholder="Enter phone" required/>
        <BAlert v-model="v$.phone.$error" variant="danger" dismissible>
          <p v-for="error in v$.phone.$errors">
            {{ error.$message }}
          </p>
        </BAlert>
      </BFormGroup>

      <BFormGroup label=" " label-for="input-5">
        <BRow>
          <div class="col-6 text-right">
            <BButton type="submit" variant="primary" class="col-12">Submit</BButton>
          </div>
          <div class="col-6">
            <BButton type="reset" variant="danger" class="col-12">Reset</BButton>
          </div>
        </BRow>
      </BFormGroup>
    </BForm>
  </BRow>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useVuelidate} from '@vuelidate/core';
import {email, required} from '@vuelidate/validators';
import {register} from '@/services/actions';
import {BAlert, BButton, BForm, BFormGroup, BFormInput, BRow} from "bootstrap-vue-next";

export default defineComponent({
  components: {BRow, BButton, BAlert, BFormInput, BFormGroup, BForm},
  setup(props, ctx) {
    const router = useRouter()

    const form = ref({
      name: "",
      lastName: "",
      email: "",
      document: "",
      phone: "",
    })

    const v$ = useVuelidate(
        {
          name: {required},
          lastName: {required},
          email: {email},
          document: {required},
          phone: {required},
        },
        form
    )

    const onSubmit = async (event: Event) => {
      event.preventDefault()
      const val = await v$.value.$validate();
      if (!val) {
        return;
      }

      try {
        let data = await register(form.value);

        if (data !== undefined && data.status == 200) {
          alert(data.data)
          await router.push("/actions");
        }
      } catch (error) {
        console.log(error, "error page");
      }
    }

    return {
      onSubmit,
      form,
      v$,
    }
  },
})
</script>
