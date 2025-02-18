import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { Toaster } from './../../components/ui/toaster';
import { useToast } from "@/hooks/use-toast";




const initialState = {
  userName: '',
  email: '',
  password: ''
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast()



  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then((result) => {
        if (result.success) {
          toast({
            title: result.message, // Corrected variable reference
          });
          navigate("/auth/login");
        } else {
          toast({
            title: result.message,
            variant: "destructive", // Corrected variable reference
          });
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        toast({
          title: 'Registration failed',
          description: error.message,
          variant: "destructive",
        });
      });
  }
  

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold track-tight text-foreground">
          Create an account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
