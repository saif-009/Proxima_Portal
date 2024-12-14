import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// import axios from '../Axios'; // Assuming Axios instance is set up
import { Input } from '@/components/ui/input'; // Assuming you're using ShadCN's components
import { Button } from '@/components/ui/button';
import Axios from '@/Axios/Axios';
import { useToast } from '@/hooks/use-toast';

function GenerateNewPassword({ emailData, token }:any) {
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [buttonLoad, setButtonLoad] = useState(false);
  const { toast } = useToast()
  const router = useRouter();


  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
  });

  const handleSetNewPassword = async (values:any) => {
    setButtonLoad(true);
    const body = { password: values.password };

    try {
      const res = await Axios.post('/reset-password', body, { headers: { Authorization: token } });
      if (res.status === 200 && res.data.valid) {
        toast({
          title: "Success",
          description:res?.data?.message?res?.data?.message:'Password reset successfully',
        })
        router.push('/login');
      } else {
        toast({
          title: "Error",
          description:res?.data?.message?res?.data?.message:'Failed, Try again later',
        })
        // showSnackbar(res?.data?.message, 'error');
      }
    } catch (error) {
      toast({
        title: "Error",
        description:'Server error',
      })
    //   showSnackbar('Error: Server Error', 'error');
    } finally {
      setButtonLoad(false);
    }
  };

  return (
    <>
      <div className="mb-3">
        <h5 className="text-lg font-semibold">Create New Password</h5>
      </div>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={passwordValidationSchema}
        onSubmit={handleSetNewPassword}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form className="space-y-4">
            <div className="mb-2">
              <label htmlFor="new-password-input" className="block text-sm font-medium text-gray-700">
                Enter New Password
              </label>
              <div className="relative">
                <Input
                  id="new-password-input"
                  name="password"
                  type={showPasswordNew ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full text-gray-700"
                  style={{backgroundColor:'white'}}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordNew(!showPasswordNew)}
                  onMouseDown={(event) => event.preventDefault()}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPasswordNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="mt-5">
              <Button type="submit" variant={'outline'} disabled={buttonLoad} className="w-full">
                {buttonLoad ? 'Submit...' : 'Submit'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default GenerateNewPassword;
