<template>
    
        <Form
            class="form w-100"
            id="kt_login_signin_form"
            @submit="onSubmitRegister"
            :validation-schema="login"
            >
             <!--begin::Heading-->
            <div class="text-center mb-10">
                <h1 class="text-dark mb-3"></h1>
                <!--begin::Input group-->
                <div class="mb-10">
                    <label class="form-label text-dark">Username</label>
                    <Field
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        name="username"
                        autocomplete="off"
                        />
                    <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                            <ErrorMessage name="username" />
                        </div>
                    </div>
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="mb-10">
                        <label class="form-label text-dark">Password</label>
                    <!--begin::Input-->
                    <Field
                        class="form-control form-control-lg form-control-solid"
                        type="password"
                        name="password"
                        autocomplete="off"
                        />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                        <ErrorMessage name="password" />
                    </div>
                    </div>
                </div>
                <!--end::Input group-->
                 <!--begin::Input group-->
                 <div class="mb-10">
                    <label class="form-label text-dark">First Name</label>
                    <Field
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        name="first_name"
                        autocomplete="off"
                        />
                    <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                            <ErrorMessage name="first_name" />
                        </div>
                    </div>
                </div>
                <!--end::Input group-->
                <!--begin::Input group-->
                <div class="mb-10">
                    <label class="form-label text-dark">Last Name</label>
                    <Field
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        name="last_name"
                        autocomplete="off"
                        />
                    <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                            <ErrorMessage name="last_name" />
                        </div>
                    </div>
                </div>
                <!--end::Input group-->
                  <!--begin::Input group-->
                  <div class="mb-10">
                    <label class="form-label text-dark">Email</label>
                    <Field
                        class="form-control form-control-lg form-control-solid"
                        type="text"
                        name="email"
                        autocomplete="off"
                        />
                    <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                </div>
                <!--end::Input group-->
                <!--begin::Actions-->
                <div class="text-center mt-3">
                    <button
                        type="submit"
                        ref="submitButton"
                        id="kt_sign_in_submit"
                        class="btn btn-lg btn-primary w-100 mb-5"
                        >
                        Register
                        <!-- <span class="indicator-label"> Continue </span>
                        <span class="indicator-progress">
                            Please wait...
                            <span
                            class="spinner-border spinner-border-sm align-middle ms-2"
                            ></span>
                        </span> -->
                    </button>
                    <div class="text-right">
                        <router-link to="/sign-in" class="nav-link">
                            <font-awesome-icon icon="sign-in-alt" /> Login
                        </router-link>
                    </div>
                </div>
            </div>
        </Form>

    
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { ErrorMessage, Field, Form } from "vee-validate";
    import { Actions } from "@/store/enums/storeEnums";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import * as Yup from "yup";
    import { confirm } from 'devextreme/ui/dialog';
    //import Swal from "node_model/sweetalert2/dist/sweetalert2.min.js";

    export default defineComponent({
        name: "sign-up", 
        components: {
            Field,
            Form,
            ErrorMessage,
        },
        setup() {
            const store = useStore();
            const router = useRouter();

            const submitButton = ref<HTMLButtonElement | null>(null);
            const login = Yup.object().shape({
                username: Yup.string().min(1).max(150).required().label("Username"),
                password: Yup.string().min(4).required().label("Password"),
                email: Yup.string().email().label("email"),
            });
            
            //Form submit function
            const onSubmitRegister = async (values: any) => {
                // Clear existing errors
                //store.dispatch(Actions.LOGOUT);

                if (submitButton.value) {
                    // eslint-disable-next-line
                    submitButton.value!.disabled = true;
                    // Activate indicator
                    submitButton.value.setAttribute("data-kt-indicator", "on");
                }

                // Send register request
                await store.dispatch(Actions.REGISTER, values);

                const [errorName] = Object.keys(store.getters.getErrors);
                const error = store.getters.getErrors[errorName];

                if (!error) {
                    const successfulresult = confirm("You have successfully logged in!", "Successful");  
                    successfulresult.then((dialogResult) => {
                        if(dialogResult == true) {
                            router.push({ name: "dashboard" });
                        }
                    });       
                    
                  
                } else {
                    const errorresult = confirm("The username or password that you've entered doesn't match any account. Sign up for an account.", "Error");
                    errorresult.then((dialogResult) => {
                        if(dialogResult == true) {
                            router.push({ name: "sing-in" });
                        }
                    });      
                }

                //Deactivate indicator
                submitButton.value?.removeAttribute("data-kt-indicator");
                // eslint-disable-next-line
                submitButton.value!.disabled = false;
            };
        
            return {
                onSubmitRegister,
                login,
                submitButton,
            };
        },
        
    });
</script>