<template>
  <BRow>
    <BForm @submit="onSubmit">
      <BAlert
          v-model="dismissCountDown"
          variant="warning"
          @close-countdown="countdown = $event"
      >
        {{ error }}
      </BAlert>
      <BFormGroup label="Document:" label-for="input-4">
        <BFormInput id="input-4" v-model="form.document" placeholder="Enter document" required/>
        <BAlert v-model="v$.document.$error" variant="danger" dismissible>
          <p v-for="error in v$.document.$errors">
            {{ error.$message }}
          </p>
        </BAlert>
      </BFormGroup>

      <BFormGroup label="Phone:" label-for="input-5">
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
        </BRow>
      </BFormGroup>
    </BForm>
  </BRow>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {decimal, required} from '@vuelidate/validators';
import {balance} from '@/services/actions';
import {BAlert, BButton, BForm, BFormGroup, BFormInput, BRow} from "bootstrap-vue-next";

export interface IEmits {
  (event: "onCloseModal", data: any): void;
  (event: "onDocument", data: any): void;
  (event: "onPhone", data: any): void;
}

const emits = defineEmits<IEmits>();
const dismissCountDown = ref(1)
const countdown = ref(0)
const error = ref('')

const form = ref({
  document: "",
  phone: "",
})

const v$ = useVuelidate(
    {
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
    const document = form.value.document
    const phone = form.value.phone
    let data = await balance(form.value);

    if (data !== undefined && data.status != 200) {
      error.value = data.message
      for (let i = 0; i < data.data.item.length; i++) {
        error.value = error.value + '; ' + data.data.item[i].message
      }
      dismissCountDown.value = dismissCountDown.value < 5000 ? 5000 : dismissCountDown.value + 1000
    }
    if (data !== undefined && data.status == 200) {
      emits("onCloseModal", {modal: 'balance', document: document, phone: phone});
    }
  } catch (error) {
    console.log(error, "error page");
  }
}
</script>
