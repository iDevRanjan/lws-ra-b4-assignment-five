import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SignUpMenu from "./SignUpMenu";

export default function LoginPageNavbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">
                Don't have an account?
            </span>
            {/* এই কোডটি রিঅ্যাক্ট ব্যবহার করে একটি ইন্টারেক্টিভ ড্রপডাউন মেনু তৈরি করে, যেখানে "Sign Up" বাটনে ক্লিক করলে `setOpen` স্টেট পরিবর্তনের মাধ্যমে চাকরিপ্রার্থী ও কোম্পানির রেজিস্ট্রেশন লিংকযুক্ত `<SignUpMenu />` কম্পোনেন্টটি স্ক্রিনে প্রদর্শিত বা আড়াল হয়; তবে এর মূল মেকানিজমটি লুকিয়ে আছে প্যারেন্ট `<div>`-এ যুক্ত থাকা `onBlur` ইভেন্ট লিসেনারের মধ্যে। ইভেন্ট বাবলিংয়ের কারণে সরাসরি বাটনে ক্লিক করলে `event.target` সেই বাটনটিকে নির্দেশ করে, তবে এখানে মনে রাখা জরুরি যে `onBlur` ইভেন্টটি আসলে তখনই ট্রিগার হয় যখন কোনো এলিমেন্ট তার ফোকাস হারায়, ক্লিক করার মুহূর্তে নয়। `blur` ইভেন্টের ক্ষেত্রে `event.target` সাধারণত সেই এলিমেন্টটিকেই নির্দেশ করে যেটি ফোকাস হারিয়েছে (যেমন: বাটনটি যদি আগে ফোকাসে থাকে), লিসেনারটি মূল কন্টেইনারে যুক্ত থাকায় `event.currentTarget` সবসময় সেই প্যারেন্ট `<div>`-টিকেই বোঝায়। ড্রপডাউন খোলা অবস্থায় ব্যবহারকারী যখন অন্য কোথাও ফোকাস সরান, তখন `blur` ইভেন্ট ট্রিগার হয় এবং নতুন ফোকাস হওয়া এলিমেন্টটি `event.relatedTarget` হিসেবে নিবন্ধিত হয়; তবে স্ক্রিনের কোনো ফোকাস-অযোগ্য এলিমেন্ট (যেমন: `body`, `div`, `span`, `p`) বা ফাঁকা জায়গায় ক্লিক করলে এর মান `null` হয়ে যায়, কারণ ফোকাস সাধারণত শুধুমাত্র `input`, `button`, `textarea`, `a` (লিংক) ইত্যাদির মতো ফোকাস-যোগ্য এলিমেন্টেই স্থানান্তরিত হতে পারে। ঠিক এই মুহূর্তে `event.currentTarget.contains(event.relatedTarget)` মেথডটি যাচাই করে যে নতুন ফোকাস হওয়া জায়গাটি মূল `<div>` কন্টেইনারের ভেতরে অবস্থিত কি না। যদি ব্যবহারকারী ড্রপডাউনের ভেতরের কোনো লিংকে (যেমন: Job seeker বা Company) ক্লিক করেন, তবে নতুন ফোকাসটি `<div>`-এর ভেতরেই থাকায় `contains` মেথডটি `true` রিটার্ন করে (যা কোডে থাকা `!` বা Not অপারেটরের কারণে `false`-এ পরিণত হয়) এবং মেনুটি হুট করে বন্ধ না হয়ে খোলাই থাকে। কিন্তু ফোকাসটি যদি ড্রপডাউনের সীমানার বাইরের কোনো এলিমেন্টে বা ফাঁকা জায়গায় চলে যায়, তখন `contains` মেথডটি `false` রিটার্ন করে (যা `!` অপারেটরের প্রভাবে `true` হয়ে যায়) এবং সাথে সাথেই `setOpen(false)` কল করে ড্রপডাউনটিকে স্বয়ংক্রিয়ভাবে বন্ধ করে দেয়, যা বাইরের ক্লিক নিখুঁতভাবে ডিটেক্ট করার মাধ্যমে ব্যবহারকারীকে একটি অত্যন্ত স্মুথ ও নিরবচ্ছিন্ন এক্সপেরিয়েন্স প্রদান করে। */}
            <div
                tabIndex={0}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setOpen(false);
                    }
                }}
                className="relative"
            >
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="btn btn-outline h-9 cursor-pointer text-sm"
                >
                    <span>Sign Up</span>
                    <ChevronDown
                        data-lucide="chevron-down"
                        className="ml-2 h-4 w-4"
                    />
                </button>
                {open && <SignUpMenu />}
            </div>
        </div>
    );
}
