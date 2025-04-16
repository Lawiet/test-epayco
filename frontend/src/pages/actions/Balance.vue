<template>
  <BRow>
    <div class="col-12">
      <BCard
          title="Balance"
          tag="article"
          style="max-width: 20rem;"
          class="col-6"
      >
        <BCardText>
          $ {{ balanceValue }}
        </BCardText>
        <BButton v-if="form.phone == '' && form.document == ''" @click="modalBalance = !modalBalance" class="col-12"> Reload Balance</BButton>
      </BCard>
    </div>

    <BFormGroup label=" ">
      <BModal v-model="modalDeposit" title="Deposit" no-footer centered>
        <Deposit @onCloseModal="onCloseModal"/>
      </BModal>
      <BModal v-model="modalPay" title="Pay" no-footer centered>
        <Pay @onCloseModal="onCloseModal"/>
      </BModal>
      <BModal v-model="modalConfirmPay" title="Confirm Pay" no-footer centered>
        <ConfirmPay @onCloseModal="onCloseModal"/>
      </BModal>
      <BModal v-model="modalBalance" title="Balance" no-footer centered>
        <ReloadBalance @onCloseModal="onCloseModal"/>
      </BModal>
    </BFormGroup>

    <BFormGroup label=" " class="col-4">
      <BButton @click="modalDeposit = !modalDeposit" class="col-12"> Deposit</BButton>
    </BFormGroup>

    <BFormGroup label=" " class="col-4">
      <BButton @click="modalPay = !modalPay" class="col-12"> Pay</BButton>
    </BFormGroup>

    <BFormGroup label=" " class="col-4">
      <BButton @click="modalConfirmPay = !modalConfirmPay" class="col-12"> Confirm Pay</BButton>
    </BFormGroup>
  </BRow>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {BButton, BCard, BCardText, BFormGroup, BModal, BRow} from "bootstrap-vue-next";
import Deposit from "@/pages/actions/Deposit.vue";
import Pay from "@/pages/actions/Pay.vue";
import ConfirmPay from "@/pages/actions/ConfirmPay.vue";
import ReloadBalance from "@/pages/actions/ReloadBalance.vue";
import {balance} from "@/services/actions";

const modalDeposit = ref(false)
const modalPay = ref(false)
const modalConfirmPay = ref(false)
const modalBalance = ref(false)
const balanceValue = ref(0.00)

const form = ref({
  document: "",
  phone: "",
})

const reloadBalance = async () => {
  if (form.value.document !== '' && form.value.phone !== '') {
    let data = await balance(form.value);
    balanceValue.value = data.data.balance
  }
}

const onCloseModal = async (value: any) => {
  switch (value.modal) {
    case 'deposit':
      modalDeposit.value = !modalDeposit.value
      form.value.document = value.document
      form.value.phone = value.phone
      await reloadBalance()
      break;
    case 'pay':
      modalPay.value = !modalPay.value
      modalConfirmPay.value = !modalConfirmPay.value
      form.value.document = value.document
      form.value.phone = value.phone
      await reloadBalance()
      break;
    case 'confirmPay':
      modalConfirmPay.value = !modalConfirmPay.value
      await reloadBalance()
      break;
    case 'balance':
      modalBalance.value = !modalBalance.value
      form.value.document = value.document
      form.value.phone = value.phone
      await reloadBalance()
      break;
  }
}
</script>

