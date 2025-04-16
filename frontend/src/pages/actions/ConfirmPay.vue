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
      <BFormGroup label="Token:" label-for="input-4">
        <BFormInput id="input-4" v-model="form.token" placeholder="Enter token" required/>
        <BAlert v-model="v$.token.$error" variant="danger" dismissible>
          <p v-for="error in v$.token.$errors">
            {{ error.$message }}
          </p>
        </BAlert>
      </BFormGroup>

      <BFormGroup label="Session Code:" label-for="input-5">
        <BFormInput id="input-5" v-model="form.sessionCode" placeholder="Enter session code" required/>
        <BAlert v-model="v$.sessionCode.$error" variant="danger" dismissible>
          <p v-for="error in v$.sessionCode.$errors">
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
import {required} from '@vuelidate/validators';
import {confirmPay} from '@/services/actions';
import {BAlert, BButton, BForm, BFormGroup, BFormInput, BRow} from "bootstrap-vue-next";

export interface IEmits {
  (event: "onCloseModal", data: any): void;
}

const emits = defineEmits<IEmits>();
const dismissCountDown = ref(1)
const countdown = ref(0)
const error = ref('')

const form = ref({
  token: "",
  sessionCode: "",
})

const v$ = useVuelidate(
    {
      token: {required},
      sessionCode: {required},
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
    let data = await confirmPay(form.value);

    if (data !== undefined && data.status != 200) {
      error.value = data.message
      for (let i = 0; i < data.data.item.length; i++) {
        error.value = error.value + '; ' + data.data.item[i].message
      }
      dismissCountDown.value = dismissCountDown.value < 5000 ? 5000 : dismissCountDown.value + 1000
    }
    if (data !== undefined && data.status == 200) {
      alert(data.data)
      emits("onCloseModal", {modal: 'confirmPay'});
    }
  } catch (error) {
    console.log(error, "error page");
  }
}
</script>
