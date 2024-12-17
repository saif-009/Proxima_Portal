// @ts-nocheck

'use client'

import { useContext, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { Separator } from '../../../../components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../../components/ui/alert-dialog'
import {
  CreditCard,
  IndianRupee,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react'
import { settingsContext } from '@/context/settingContext'
import Axios from '@/Axios/Axios'


// const PaymentForRechargeWallet = dynamic(() => import('../(payment-integration)/PaymentForRechargeWallet'), { ssr: false });
import PaymentForRechargeWallet from '../(payment-integration)/PaymentForRechargeWallet'


export default function WalletCard({userData}:any) {
  const payForReachargeWalletWithRazorpay = PaymentForRechargeWallet()
  const {userDetails} = useContext<any>(settingsContext)
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const walletBalance = userData?.user?.wallet
  const lastRecharge = { amount: 5000.0, date: '2023-05-15' }
  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 5000.0,
      date: '2023-05-15',
      description: 'Wallet Recharge',
    },
    {
      id: 2,
      type: 'debit',
      amount: 2500.0,
      date: '2023-05-14',
      description: 'Purchase',
    },
    {
      id: 3,
      type: 'credit',
      amount: 10000.0,
      date: '2023-05-10',
      description: 'Wallet Recharge',
    },
    {
      id: 4,
      type: 'debit',
      amount: 3500.0,
      date: '2023-05-08',
      description: 'Purchase',
    },
    {
      id: 5,
      type: 'debit',
      amount: 1000.0,
      date: '2023-05-05',
      description: 'Purchase',
    },
  ]

  const quickRechargeOptions = [500, 1000, 2000, 5000]

  const handleRecharge = () => {
    setIsConfirmationOpen(true)
  }

  const confirmRecharge = () => {
    // Implement the actual recharge logic here
    setIsConfirmationOpen(false)
    setRechargeAmount('')
  }

  const formatINR = (amount: number) => {
    return amount?.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR',
    })
  }


  // create order for wallet recharge
  const createOrder = async (amount:any) => {

   
      if(amount){
        const body = {
          // total_amount:rechargeAmount,
          amount:Number(rechargeAmount) * 100, //in smallest currendcy unit. i.e in paisa
          currency: "INR",
          receipt: "Anurag#955",
          // used_wallet_spend:campaignBody?.used_wallet_spend,
          notes: {
            description: "payment against ad campaign",
             campaign:"" ,
          }
        }
        try {
          const res = await Axios.post("/create-order", body)
          if (res.status === 200) {
             
            const data = res?.data?.message;
             const amount = Number(data.amount)/100;
             const orderid = data?.id
             
            RechargeWallet(amount, orderid)
            
          }
        } catch (error) {        
          
        }finally{
         
        }
      }
    
  }


  const RechargeWallet = async (amount:any, orderid:any)=>{
    const prefilledDetails = { name: userDetails?.name, email: userDetails?.email, number: userDetails?.mobile }
     if(rechargeAmount){
      payForReachargeWalletWithRazorpay(amount, orderid, prefilledDetails)
     }
  } 

  return (
    <Card className="w-full max-w-4xl mx-auto my-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">LeapX Wallet</CardTitle>
        <CardDescription>
          Manage your wallet balance and recharge
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex max-[300px]:flex-col min-[300px]:justify-between items-center">
          <div className="max-[300px]:text-center">
            <Label className="text-sm  font-medium text-muted-foreground">
              Current Balance
            </Label>
            <p className="text-2xl  font-bold">{formatINR(userDetails?.wallet?userDetails?.wallet:0)}</p>
          </div>
          <div className="text-right">
            <Label className="text-sm font-medium text-muted-foreground">
              Last Recharge
            </Label>
            <p className="text-lg font-semibold">
              {formatINR(lastRecharge.amount?lastRecharge.amount:0)}
            </p>
            <p className="text-sm text-muted-foreground">{lastRecharge.date}</p>
          </div>
        </div>
        <Separator />
        <div>
          <Label htmlFor="recharge-amount" className="text-sm font-medium">
            Recharge Amount
          </Label>
          <div className="mt-1.5 relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="recharge-amount"
              type="number"
              placeholder="Enter amount"
              className="pl-8"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">Quick Recharge</Label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {quickRechargeOptions.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setRechargeAmount(amount.toString())}
              >
                {formatINR(amount?amount:0)}
              </Button>
            ))}
          </div>
        </div>
        <AlertDialog
          open={isConfirmationOpen}
          onOpenChange={setIsConfirmationOpen}
        >
          <AlertDialogTrigger asChild>
            <Button className="w-full" size="lg" onClick={handleRecharge}>
              <CreditCard className="mr-2 h-4 w-4" />
              Recharge Wallet
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Recharge</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to recharge your wallet with{' '}
                {formatINR(parseFloat(rechargeAmount) || 0)}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={createOrder}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Separator />
        <div>
          <Label className="text-sm font-medium">Recent Transactions</Label>
          <ScrollArea className="h-[200px] mt-1.5">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center">
                  {transaction.type === 'credit' ? (
                    <ArrowUpCircle className="text-green-500 mr-2 h-4 w-4" />
                  ) : (
                    <ArrowDownCircle className="text-red-500 mr-2 h-4 w-4" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    transaction.type === 'credit'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}
                  {formatINR(transaction.amount?transaction.amount:0)}
                </p>
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Secure payments powered by LeapX
      </CardFooter>
    </Card>
  )
}
