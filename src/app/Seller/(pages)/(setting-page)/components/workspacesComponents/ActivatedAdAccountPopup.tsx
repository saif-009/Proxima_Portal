//@ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../../../../components/ui/dialog"
import { Button } from "../../../../../../../components/ui/button"
import { RadioGroup, RadioGroupItem } from "../../../../../../../components/ui/radio-group"
import { Label } from "../../../../../../../components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../../../components/ui/card"
import Axios from '../../../../../../../Axios/Axios'
import { activeAccountAtom } from '../../../../../../../store/activeAdAccount' 


// interface Account {
//   id: string
//   name: string
//   type: string
// }

export default function ActivatedAdAccountPopup({getWorkSpaceDetails, activeWorkspace, adAccountList}) {
  const [activatedAdAccount, setActivatedAdAccount] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState<any>("")
  const [activeAccount, setActiveAccount] = useState<Account | null>(null)
  const [loadSelectAdAccount, setLoadSelectAdAccount] = useState(false)

//   useEffect(() => {
//     setIsOpen(!activatedAdAccount)
//   }, [activatedAdAccount])

//   const accounts: Account[] = [
//     { id: '1', name: 'Personal Account', type: 'Personal' },
//     { id: '2', name: 'Business Account', type: 'Business' },
//     { id: '3', name: 'Advertising Account', type: 'Advertising' },
//     { id: '4', name: 'Agency Account', type: 'Agency' },
//   ]


  
  console.log('selected ad account', selectedAccount)
  console.log('active account', activeAccount)
  const onSelectAdAccount = async (accountid:any)=>{
    setLoadSelectAdAccount(true)
    try {
     const body = {adaccountId:accountid}
     const res = await Axios.post("/connect-adaccount", body)
       if(res?.status===200 && res?.data?.valid){
         getWorkSpaceDetails(activeWorkspace)
         setIsOpen(false)
       }
    } catch (error) {
     console.log("error", error)
    }finally{
        setLoadSelectAdAccount(false)
    }
   
}

console.log("selectedAccount", selectedAccount)

  const handleSubmit = () => {
    if (selectedAccount) {
       console.log("clicked")
        onSelectAdAccount(selectedAccount)


    //   const account = accounts.find(acc => acc.id === selectedAccount)
    //   if (account) {
    //     setActiveAccount(account)
    //     setActivatedAdAccount(true)
        
    //   }
    }
  }

//   if (activatedAdAccount && activeAccount) {
//     return (
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle>Active Account</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="font-medium">{activeAccount.name}</p>
//           <p className="text-sm text-muted-foreground">{activeAccount.type}</p>
//         </CardContent>
//       </Card>
//     )
//   }

  return (
    <Dialog open={isOpen} closeOnEscapeKeyDown={false}>
      <DialogContent className="sm:max-w-[425px] md:min-w-[500px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Select ad account</DialogTitle>
        </DialogHeader>
        <div className=' h-[300px] overflow-y-auto'>
        <RadioGroup onValueChange={setSelectedAccount} className="gap-4">
          {adAccountList?.map((account) => (
            <div key={account.id} className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value={account.id} id={account.id} />
              <Label htmlFor={account.id} className="flex-grow">
                <div className="font-medium">{account.name}</div>
              </Label>
            </div>
          ))}
        
         
        </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button type='button' onClick={handleSubmit} disabled={loadSelectAdAccount?true:false}>{loadSelectAdAccount?'Submit...':'Submit'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}