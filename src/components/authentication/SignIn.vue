<template>
        <Form
            class="form w-100"
            id="kt_login_signin_form"
            @submit="onSubmitLogin"
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

                <!--begin::Actions-->
                <div class="text-center mt-3">
                    <button
                        type="submit"
                        ref="submitButton"
                        id="kt_sign_in_submit"
                        class="btn btn-lg btn-primary w-100 mb-5"
                        >
                        Login
                    </button>
                    <div class="text-right">
                        <router-link to="/register" class="nav-link">
                            <font-awesome-icon icon="user-plus" /> Sign Up
                        </router-link>
                    </div>
                </div>
            </div>
        </Form>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import { ErrorMessage, Field, Form } from "vee-validate";
    import { Actions } from "@/store/enums/storeEnums";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import * as Yup from "yup";
    import { confirm } from 'devextreme/ui/dialog';

    export default defineComponent({
        name: "sign-in", 
        components: {
            Field,
            Form,
            ErrorMessage,
        },
        setup() {

            const store = useStore();
            const router = useRouter();

            const login = Yup.object().shape({
                username: Yup.string().required().label("Username"),
                password: Yup.string().min(4).required().label("Password"),
            });
            
            //Form submit function
            const onSubmitLogin = async (values: any) => {
                
                // Send login request
                await store.dispatch(Actions.LOGIN, values);

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
            };

            onMounted(() => {
                if (store.getters.isUserAuthenticated) {
                    router.push({ name: "dashboard" });
                }
            });
        
            return {
                onSubmitLogin,
                login
            };
        },
        
    });
</script>