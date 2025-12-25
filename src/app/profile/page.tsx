
'use client';

import React, { useState, useEffect, type ChangeEvent, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit3, FileText, Briefcase, GraduationCap, Award, Star, MapPin, ExternalLink, Languages, Loader2, AlertCircle, Sparkles, User, Target, Save, X, Building, Upload } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout'; 
import { AppHeader } from '@/components/layout/AppHeader';
import { useRouter } from 'next/navigation'; 
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

// --- Data Structures ---
interface EducationEntry {
  id?: string | number;
  degree: string;
  institution: string;
  start_date?: string;
  end_date?: string;
  cgpa?: string;
}
interface WorkExperienceEntry {
  id?: string | number;
  company: string;
  job_title: string;
  location?: string;
  start_date: string;
  end_date: string | null;
  responsibilities: string[];
}
interface SkillEntry {
    id?: string | number;
    category: string;
    skills: string[];
}
interface CertificationEntry {
    id?: string | number;
    certification: string;
    year: number;
}
interface ProjectEntry {
    id?: string | number;
    project_name: string;
    description: string;
    url?: string;
}
interface LanguageEntry {
    id?: string | number;
    language: string;
    proficiency: string;
}
interface AchievementEntry {
    id?: string | number;
    description: string;
}

interface Resume {
    id: number;
    title: string;
    is_default: boolean;
    is_active: boolean;
    experience_level: string;
    total_experience_years: number;
    total_experience_months: number;
    current_company: string;
    current_designation: string;
    notice_period: string;
    current_salary: number;
    education_data: EducationEntry[];
    work_experience_data: WorkExperienceEntry[];
    skills_data: { [key: string]: string[] };
    certifications_data: CertificationEntry[];
    projects_data: ProjectEntry[];
    languages_data: LanguageEntry[];
    achievements_data: string[];
    keywords: string[];
}


interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  dataAiHintAvatar: string;
  title: string;
  location: { city: string, state: string };
  bio: string;
  job_status: string;
  preferred_job_types: string[];
  preferred_locations: string[];
  expected_salary: number;
  willing_to_relocate: boolean;
  linkedin_url: string;
  portfolio_url: string;
  preferred_roles: string[];
  dream_companies: string[];
}

interface JobSeekerProfile {
    id: string;
    headline: string;
    city: string;
    state: string;
    summary: string;
    job_status: string;
    preferred_job_types: string[];
    preferred_locations: string[];
    expected_salary: number;
    willing_to_relocate: boolean;
    linkedin_url: string;
    portfolio_url: string;
    preferred_roles: string[];
    dream_companies: string[];
    profile_picture?: string;
}

interface UserDetails {
    first_name: string;
    last_name: string;
    profile_image?: string;
}

type EditableSection = 'profile' | 'preferences' | null;

const job_roles = [
    // A
    "Accountant", "Accounting Assistant", "Accounting Clerk", "Accounting Director", "Account Executive", "Account Manager", "Accounts Payable Clerk",
    "Accounts Receivable Clerk", "Actuary", "Acupuncturist", "Administrative Assistant", "Advertising Account Executive", "Advertising Copywriter", "Advocate",
    "Aerospace Engineer", "Agricultural Consultant", "Agricultural Scientist", "Aircraft Maintenance Technician", "Airline Pilot", "Air Traffic Controller",
    "Algorithm Developer", "Analytics Engineer", "Analytics Manager", "Android Developer", "Anesthesiologist", "Animal Care Assistant", "Animal Trainer", "Animator",
    "Anthropologist", "Application Developer", "Architect", "Art Director", "Assembler", "Assistant Controller", "Auditor", "Automotive Mechanic",
    // B
    "Backend Developer", "Bank Manager", "Bank Teller", "Barber", "Bartender", "Benefits Analyst", "Big Data Engineer", "Billing Specialist", "Biostatistician",
    "Blockchain Developer", "Bookkeeper", "Brand Manager", "Budget Analyst", "Business Analyst", "Business Development Manager", "Business Intelligence Analyst", "Business Owner",
    // C
    "Cable Installer", "CAD Designer", "Call Center Representative", "Camera Operator", "Carpenter", "Cashier", "Chef", "Chemical Engineer", "Chief Executive Officer",
    "Chief Financial Officer", "Chief Marketing Officer", "Chief Technology Officer", "Civil Engineer", "Claims Adjuster", "Cleaner", "Clinical Researcher", "Cloud Architect",
    "CNC Machinist", "Coach", "Collections Specialist", "Communications Director", "Community Manager", "Compensation Analyst", "Computer Programmer", "Computer Scientist",
    "Construction Manager", "Construction Worker", "Consultant", "Content Creator", "Content Writer", "Contract Administrator", "Controller", "Cook", "Copywriter",
    "Corporate Trainer", "Cost Estimator", "Counselor", "Court Reporter", "Creative Director", "Credit Analyst", "Customer Service Representative", "Customer Success Manager", "Cybersecurity Analyst",
    // D
    "Database Administrator", "Database Developer", "Data Analyst", "Data Engineer", "Data Entry Clerk", "Data Scientist", "Delivery Driver", "Dental Assistant",
    "Dental Hygienist", "Dentist", "Designer", "Desktop Support Technician", "DevOps Engineer", "Digital Marketing Manager", "Director of Operations", "Dispatcher", "Doctor", "Drone Pilot",
    // E
    "Economist", "Editor", "Electrical Engineer", "Electrician", "Electronics Technician", "Email Marketing Specialist", "Emergency Medical Technician", "Engineer",
    "Enterprise Architect", "Environmental Engineer", "Environmental Scientist", "Estate Planning Attorney", "Event Coordinator", "Event Planner", "Executive Assistant", "Executive Chef",
    // F
    "Facilities Manager", "Factory Worker", "Fashion Designer", "Field Service Technician", "Film Director", "Financial Advisor", "Financial Analyst", "Financial Planner",
    "Firefighter", "Fitness Trainer", "Flight Attendant", "Florist", "Food Service Worker", "Forklift Operator", "Frontend Developer", "Full Stack Developer", "Fundraiser",
    // G
    "Game Developer", "General Manager", "Geologist", "Government Employee", "Graphic Designer", "Growth Hacker", "Guard", "Guidance Counselor",
    // H
    "Hairdresser", "Hardware Engineer", "Health Inspector", "Healthcare Administrator", "Help Desk Specialist", "Home Health Aide", "Hotel Manager", "HR Administrator",
    "HR Director", "HR Generalist", "HR Manager", "HR Specialist", "HVAC Technician",
    // I
    "Industrial Designer", "Industrial Engineer", "Information Security Analyst", "Insurance Agent", "Insurance Underwriter", "Interior Designer", "Interpreter",
    "Investment Advisor", "IT Administrator", "IT Consultant", "IT Director", "IT Manager", "IT Support Specialist",
    // J
    "Janitor", "Java Developer", "Journalist", "Judge", "Junior Developer",
    // K
    "Kitchen Staff",
    // L
    "Lab Technician", "Landscape Architect", "Landscaper", "Lawyer", "Legal Assistant", "Librarian", "Licensed Practical Nurse", "Loan Officer", "Logistics Coordinator", "Logistics Manager",
    // M
    "Machine Learning Engineer", "Machine Operator", "Maintenance Worker", "Management Consultant", "Marketing Coordinator", "Marketing Director", "Marketing Manager",
    "Marketing Specialist", "Massage Therapist", "Mechanical Engineer", "Media Planner", "Medical Assistant", "Medical Technologist", "Mental Health Counselor", "Mobile Developer", "Music Teacher", "Musician",
    // N
    "Network Administrator", "Network Engineer", "Nurse", "Nurse Practitioner", "Nursing Assistant", "Nutritionist",
    // O
    "Occupational Therapist", "Office Administrator", "Office Manager", "Operations Analyst", "Operations Director", "Operations Manager", "Optometrist",
    // P
    "Paralegal", "Paramedic", "Pastor", "Payroll Clerk", "Payroll Specialist", "Personal Trainer", "Pharmacist", "Pharmacy Technician", "Photographer", "Physical Therapist",
    "Physician", "Pilot", "Plumber", "Police Officer", "Political Scientist", "Product Manager", "Product Owner", "Production Manager", "Professor", "Program Manager",
    "Programmer", "Project Coordinator", "Project Manager", "Property Manager", "Psychologist", "Public Relations Specialist", "Purchasing Agent",
    // Q
    "Quality Assurance Analyst", "Quality Assurance Engineer", "Quality Control Inspector",
    // R
    "Radiologic Technologist", "Real Estate Agent", "Receptionist", "Recruiter", "Registered Nurse", "Research Analyst", "Research Scientist", "Restaurant Manager", "Retail Manager", "Retail Sales Associate",
    // S
    "Safety Engineer", "Sales Associate", "Sales Director", "Sales Engineer", "Sales Manager", "Sales Representative", "School Administrator", "School Counselor",
    "Security Guard", "SEO Specialist", "Server", "Social Media Manager", "Social Media Specialist", "Social Worker", "Software Architect", "Software Developer",
    "Software Engineer", "Software Tester", "Speech Therapist", "Store Manager", "Superintendent", "Supply Chain Manager", "Surgeon", "Systems Administrator", "Systems Analyst",
    // T
    "Tax Accountant", "Tax Preparer", "Teacher", "Technical Support Specialist", "Technical Writer", "Technician", "Territory Manager", "Test Engineer", "Therapist",
    "Training Coordinator", "Training Manager", "Translator", "Travel Agent", "Truck Driver",
    // U
    "UX Designer", "UI Designer", "University Professor", "Urban Planner",
    // V
    "Veterinarian", "Veterinary Technician", "Video Editor", "Vice President",
    // W
    "Waiter", "Warehouse Manager", "Warehouse Worker", "Web Designer", "Web Developer", "Welder", "Writer",
    // X, Y, Z
    "X-Ray Technician", "Yoga Instructor", "Zoologist"
];

const big_companies = [
    // Top Tech Companies
    "Apple", "Microsoft", "NVIDIA", "Amazon", "Alphabet (Google)", "Meta (Facebook)", "Tesla", "Netflix", "Adobe", "Oracle", "Salesforce", "ServiceNow", "Uber", "Airbnb", "Spotify", "Twitter (X)", "LinkedIn", "PayPal", "Square", "Zoom",
    // Banking & Financial Services
    "JPMorgan Chase", "Bank of America", "Wells Fargo", "Citigroup", "Goldman Sachs", "Morgan Stanley", "Visa", "Mastercard", "American Express", "BlackRock", "Charles Schwab", "State Street", "Fidelity Investments", "T. Rowe Price", "HDFC Bank", "Industrial and Commercial Bank of China", "China Construction Bank", "Royal Bank of Canada", "Commonwealth Bank of Australia",
    // Oil & Energy
    "Saudi Aramco", "ExxonMobil", "Chevron", "Shell", "BP", "TotalEnergies", "ConocoPhillips", "China National Petroleum", "Sinopec", "Gazprom", "Lukoil", "Rosneft", "Petrobras", "Eni", "Equinor",
    // Healthcare & Pharmaceuticals
    "UnitedHealth Group", "Johnson & Johnson", "Pfizer", "Roche", "Novartis", "Merck", "AbbVie", "Bristol Myers Squibb", "Eli Lilly", "Amgen", "Gilead Sciences", "Moderna", "CVS Health", "Anthem", "Humana", "Cigna", "Aetna", "Kaiser Permanente",
    // Retail & E-commerce
    "Walmart", "Costco", "Home Depot", "Target", "Lowe's", "Best Buy", "Macy's", "Nordstrom", "TJX Companies", "Dollar General", "Dollar Tree", "Kroger", "Albertsons", "Publix", "Ahold Delhaize", "Carrefour", "Tesco", "IKEA", "H&M", "Zara (Inditex)",
    // Automotive
    "Toyota", "Volkswagen Group", "General Motors", "Ford Motor Company", "Stellantis", "Mercedes-Benz Group", "BMW Group", "Honda", "Nissan", "Hyundai Motor Group", "Ferrari", "Porsche", "Volvo", "Mazda", "Subaru", "Mitsubishi Motors", "BYD", "Nio", "XPeng", "Li Auto",
    // Aerospace & Defense
    "Boeing", "Airbus", "Lockheed Martin", "Raytheon Technologies", "Northrop Grumman", "General Dynamics", "BAE Systems", "Thales", "Leonardo", "Saab",
    // Telecommunications
    "AT&T", "Verizon", "T-Mobile", "Comcast", "Charter Communications", "Deutsche Telekom", "Vodafone", "Orange", "Telefonica", "China Mobile", "China Telecom", "China Unicom", "NTT", "SoftBank", "KDDI",
    // Manufacturing & Industrial
    "General Electric", "Siemens", "3M", "Honeywell", "Caterpillar", "Deere & Company", "Illinois Tool Works", "Emerson Electric", "Parker Hannifin", "Danaher", "Thermo Fisher Scientific", "ABB", "Schneider Electric", "Legrand", "Eaton",
    // Media & Entertainment
    "Disney", "Comcast (NBCUniversal)", "Warner Bros. Discovery", "Paramount Global", "Sony", "Universal Music Group", "Live Nation Entertainment", "EA (Electronic Arts)", "Activision Blizzard", "Take-Two Interactive", "Ubisoft", "Nintendo",
    // Food & Beverage
    "Coca-Cola", "PepsiCo", "Nestle", "Unilever", "Procter & Gamble", "Mars", "Mondelez International", "General Mills", "Kellogg", "Kraft Heinz", "Tyson Foods", "JBS", "Cargill", "Archer Daniels Midland", "Danone",
    // Consulting & Professional Services
    "Accenture", "Deloitte", "PwC", "EY (Ernst & Young)", "KPMG", "McKinsey & Company", "Boston Consulting Group", "Bain & Company", "IBM", "Cognizant", "Tata Consultancy Services", "Infosys", "Wipro", "HCL Technologies", "Tech Mahindra",
    // Semiconductor Companies
    "TSMC", "ASML", "Broadcom", "Qualcomm", "Intel", "AMD", "Micron Technology", "Applied Materials", "Lam Research", "KLA Corporation", "Analog Devices", "Marvell Technology", "MediaTek", "SK Hynix", "Samsung Electronics",
    // Chinese Tech Giants
    "Tencent", "Alibaba", "Baidu", "JD.com", "Meituan", "Pinduoduo (PDD Holdings)", "ByteDance", "Xiaomi", "Didi Chuxing", "NetEase", "Bilibili", "Kuaishou",
    // Airlines
    "American Airlines", "Delta Air Lines", "United Airlines", "Southwest Airlines", "JetBlue Airways", "Lufthansa", "Air France-KLM", "British Airways", "Emirates", "Qatar Airways", "Singapore Airlines", "Cathay Pacific", "Japan Airlines", "All Nippon Airways",
    // Hotels & Hospitality
    "Marriott International", "Hilton Worldwide", "InterContinental Hotels Group", "Hyatt Hotels", "Accor", "Wyndham Hotels & Resorts", "Choice Hotels", "Best Western", "Radisson Hotel Group", "Four Seasons",
    // Real Estate
    "Brookfield Asset Management", "Simon Property Group", "Prologis", "American Tower", "Crown Castle", "Realty Income", "Public Storage", "Equity Residential", "AvalonBay Communities", "Boston Properties",
    // Logistics & Transportation
    "FedEx", "UPS", "DHL", "Union Pacific", "CSX", "Norfolk Southern", "Canadian National Railway", "Canadian Pacific Railway", "Deutsche Post DHL", "Royal Mail",
    // Mining & Materials
    "BHP", "Rio Tinto", "Vale", "Glencore", "Freeport-McMoRan", "Newmont", "Barrick Gold", "Anglo American", "Teck Resources", "Southern Copper",
    // Utilities
    "NextEra Energy", "Dominion Energy", "Duke Energy", "Southern Company", "American Electric Power", "Exelon", "Sempra Energy", "Public Service Enterprise Group", "Edison International", "Consolidated Edison",
    // Insurance
    "Berkshire Hathaway", "AIG", "Prudential Financial", "MetLife", "Aflac", "Progressive", "Allstate", "Travelers Companies", "Chubb", "Hartford Financial Services",
    // Luxury Brands
    "LVMH", "Hermès", "Kering", "Richemont", "Chanel", "Burberry", "Ralph Lauren", "Coach (Tapestry)", "Michael Kors (Capri Holdings)", "Tiffany & Co.",
    // Sports & Fitness
    "Nike", "Adidas", "Puma", "Under Armour", "Lululemon", "New Balance", "Reebok", "Asics", "Skechers", "VF Corporation",
    // Gaming Companies
    "Roblox", "Unity Software", "Epic Games", "Valve Corporation", "Riot Games", "Blizzard Entertainment", "King Digital Entertainment", "Supercell", "Machine Zone", "Zynga"
];
const unique_big_companies = [...new Set(big_companies)];

const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; className?: string; onEdit?: () => void; }> =
({ title, icon: Icon, children, className, onEdit }) => (
  <Card className={cn("shadow-xl border-border/40 rounded-xl bg-card/80 backdrop-blur-md overflow-hidden", className)}>
    <CardHeader className="p-3.5 pb-2 flex flex-row items-center justify-between md:p-6 md:pb-4">
      <CardTitle className="text-md font-semibold text-foreground flex items-center gap-2.5 md:text-xl">
        <span className="p-1.5 md:p-2 bg-gradient-to-br from-primary/15 to-accent/15 rounded-lg text-primary shadow-inner">
          <Icon className="h-4 w-4 md:h-5 md:w-5" />
        </span>
        {title}
      </CardTitle>
      {onEdit && <Button variant="ghost" size="icon" onClick={onEdit} className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"><Edit3 className="h-4 w-4"/></Button>}
    </CardHeader>
    <CardContent className="p-3.5 pt-1 space-y-3 md:p-6 md:pt-2">
      {children}
    </CardContent>
  </Card>
);

const ProfileListItem: React.FC<{
    avatarUrl?: string; 
    dataAiHintAvatar?: string; 
    fallbackText?: string; 
    title: string; 
    subtitle?: string; 
    subtitleSecondary?: string; 
    children?: React.ReactNode;
    badge?: React.ReactNode
}> = ({ avatarUrl, dataAiHintAvatar, fallbackText, title, subtitle, subtitleSecondary, children, badge}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 dark:bg-slate-700/30 overflow-hidden">
      {avatarUrl && (
          <Avatar className="h-11 w-11 border-2 border-primary/20 shrink-0 shadow-md">
              <AvatarImage src={avatarUrl} alt={title} data-ai-hint={dataAiHintAvatar} />
              {fallbackText && <AvatarFallback>{fallbackText.substring(0,2)}</AvatarFallback>}
          </Avatar>
      )}
      <div className="flex-grow overflow-hidden">
          <div className="flex justify-between items-start">
              <div className="overflow-hidden mr-1">
                  <h4 className="text-sm font-semibold text-foreground leading-tight truncate">{title}</h4>
                  {subtitle && <p className="text-xs text-primary truncate">{subtitle}</p>}
                  {subtitleSecondary && <p className="text-xs text-muted-foreground truncate">{subtitleSecondary}</p>}
              </div>
              {badge && <div className="ml-2 shrink-0">{badge}</div>}
          </div>
          {children && <div className="mt-1.5 text-xs text-muted-foreground/90 space-y-0.5 md:text-sm">{children}</div>}
      </div>
  </div>
);


const ProfileEditForm: React.FC<{
    initialData: UserProfile;
    onSave: (data: Partial<UserProfile>, file?: File) => Promise<void>;
    onCancel: () => void;
}> = ({ initialData, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
        name: initialData.name,
        title: initialData.title,
        location: { ...initialData.location },
        bio: initialData.bio,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData.avatarUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        
        const nameParts = editData.name.split(' ') || [''];
        const userPayload = {
            first_name: nameParts[0],
            last_name: nameParts.slice(1).join(' ')
        };

        const profilePayload = new FormData();
        profilePayload.append('headline', editData.title);
        profilePayload.append('summary', editData.bio);
        profilePayload.append('city', editData.location.city);
        profilePayload.append('state', editData.location.state);
        
        if (imageFile) {
            profilePayload.append('profile_picture', imageFile);
        }

        await onSave(userPayload, imageFile ?? undefined);
        setIsSaving(false);
    };

    return (
        <SectionCard title="Profile" icon={User}>
            <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8 text-green-500 hover:bg-green-500/10" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin"/> : <Save className="h-4 w-4"/>}
                </Button>
                <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 text-destructive hover:bg-destructive/10" disabled={isSaving}><X className="h-4 w-4"/></Button>
            </div>
            <div className="space-y-4 text-left pt-2">
                 <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24 mx-auto mb-2 border-4 border-background ring-2 ring-primary shadow-lg">
                        {imagePreview && <AvatarImage src={imagePreview} alt={editData.name}/>}
                        <AvatarFallback className="text-3xl bg-muted">{editData.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                    <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4"/> Change Photo
                    </Button>
                </div>
                <div><Label htmlFor="edit-name">Full Name</Label><Input id="edit-name" value={editData.name} onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))} /></div>
                <div><Label htmlFor="edit-title">Headline</Label><Input id="edit-title" value={editData.title} onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))} /></div>
                <div className="grid grid-cols-2 gap-2">
                    <div><Label htmlFor="edit-city">City</Label><Input id="edit-city" value={editData.location.city} onChange={(e) => setEditData(prev => ({ ...prev, location: { ...prev.location, city: e.target.value } }))} /></div>
                    <div><Label htmlFor="edit-state">State</Label><Input id="edit-state" value={editData.location.state} onChange={(e) => setEditData(prev => ({ ...prev, location: { ...prev.location, state: e.target.value } }))} /></div>
                </div>
                <div><Label htmlFor="edit-bio">Summary</Label><Textarea id="edit-bio" value={editData.bio} onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))} rows={4} /></div>
            </div>
        </SectionCard>
    );
};


const PreferencesEditForm: React.FC<{
    initialData: UserProfile;
    onSave: (data: Partial<UserProfile>) => Promise<void>;
    onCancel: () => void;
}> = ({ initialData, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
        job_status: initialData.job_status,
        expected_salary: initialData.expected_salary,
        willing_to_relocate: initialData.willing_to_relocate,
        preferred_job_types: [...initialData.preferred_job_types],
        preferred_locations: initialData.preferred_locations.join(', '),
        preferred_roles: [...initialData.preferred_roles],
        dream_companies: [...initialData.dream_companies],
    });
    const [isSaving, setIsSaving] = useState(false);
    
    const handleJobTypeChange = (jobType: string) => {
        setEditData(prev => {
            const currentTypes = prev.preferred_job_types;
            const newJobTypes = currentTypes.includes(jobType)
                ? currentTypes.filter(type => type !== jobType)
                : [...currentTypes, jobType];
            return { ...prev, preferred_job_types: newJobTypes };
        });
    };
    
    const handleArrayInputChange = (e: React.KeyboardEvent<HTMLInputElement>, field: 'preferred_roles' | 'dream_companies') => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const value = e.currentTarget.value.trim();
        if (value && !editData[field].includes(value)) {
          setEditData(prev => ({ ...prev, [field]: [...prev[field], value] }));
        }
        e.currentTarget.value = '';
      }
    };
    
    const removeArrayItem = (index: number, field: 'preferred_roles' | 'dream_companies') => {
      setEditData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await onSave({
            ...editData,
            preferred_locations: editData.preferred_locations.split(',').map(s => s.trim()).filter(Boolean),
        });
        setIsSaving(false);
    };

    return (
        <SectionCard title="Job Preferences" icon={Target}>
             <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8 text-green-500 hover:bg-green-500/10" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin"/> : <Save className="h-4 w-4"/>}
                </Button>
                <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 text-destructive hover:bg-destructive/10" disabled={isSaving}><X className="h-4 w-4"/></Button>
            </div>
            <div className="space-y-4">
                <div className="space-y-2"><Label>Job Status</Label><RadioGroup value={editData.job_status} onValueChange={(v) => setEditData(prev => ({...prev, job_status: v}))}><div className="flex items-center space-x-2"><RadioGroupItem value="actively_looking" id="r1"/><Label htmlFor="r1">Actively Looking</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="passively_looking" id="r2"/><Label htmlFor="r2">Passively Looking</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="not_looking" id="r3"/><Label htmlFor="r3">Not Looking</Label></div></RadioGroup></div>
                <div className="space-y-2"><Label>Expected Salary (INR)</Label><Input type="number" value={editData.expected_salary || ''} onChange={(e) => setEditData(prev => ({ ...prev, expected_salary: Number(e.target.value) }))} /></div>
                <div className="flex items-center space-x-2 pt-2"><Checkbox id="relocate" checked={editData.willing_to_relocate} onCheckedChange={(c) => setEditData(prev => ({ ...prev, willing_to_relocate: Boolean(c) }))}/><Label htmlFor="relocate">Willing to relocate?</Label></div>
                <div className="space-y-2"><Label>Preferred Job Types</Label><div className="flex flex-wrap gap-x-4 gap-y-2">{['full_time', 'part_time', 'contract', 'remote', 'internship'].map(type => (<div key={type} className="flex items-center space-x-2"><Checkbox id={`type-${type}`} onCheckedChange={() => handleJobTypeChange(type)} checked={editData.preferred_job_types.includes(type)}/><Label htmlFor={`type-${type}`} className="capitalize">{type.replace(/_/g, ' ')}</Label></div>))}</div></div>
                <div className="space-y-2"><Label>Preferred Locations</Label><Input placeholder="Mumbai, Pune..." value={editData.preferred_locations} onChange={(e) => setEditData(prev => ({...prev, preferred_locations: e.target.value}))} /></div>

                <div className="space-y-2">
                    <Label htmlFor="preferred_roles">Preferred Roles (Press Enter to add)</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] bg-muted/50">
                        {editData.preferred_roles.map((role, index) => (
                        <Badge key={index} variant="secondary" className="pl-2 pr-1 py-0.5 text-sm bg-primary/20 text-primary-foreground border-primary/50">
                            {role}
                            <button type="button" onClick={() => removeArrayItem(index, 'preferred_roles')} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"><X className="h-3 w-3"/></button>
                        </Badge>
                        ))}
                    </div>
                    <Input id="preferred_roles" placeholder="Type a role and press Enter..." list="job-roles-list" onKeyDown={(e) => handleArrayInputChange(e, 'preferred_roles')} />
                    <datalist id="job-roles-list">{job_roles.map((role) => (<option key={role} value={role} />))}</datalist>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dream_companies">Dream Companies (Press Enter to add)</Label>
                     <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] bg-muted/50">
                        {editData.dream_companies.map((company, index) => (
                        <Badge key={index} variant="secondary" className="pl-2 pr-1 py-0.5 text-sm bg-accent/20 text-accent-foreground border-accent/50">
                            {company}
                            <button type="button" onClick={() => removeArrayItem(index, 'dream_companies')} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"><X className="h-3 w-3"/></button>
                        </Badge>
                        ))}
                    </div>
                    <Input id="dream_companies" placeholder="Type a company and press Enter..." list="dream-companies-list" onKeyDown={(e) => handleArrayInputChange(e, 'dream_companies')} />
                    <datalist id="dream-companies-list">{unique_big_companies.map((company) => (<option key={company} value={company} />))}</datalist>
                </div>
            </div>
        </SectionCard>
    );
};


export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<EditableSection>(null);

  const fetchProfileData = async () => {
    setIsLoading(true);
    setError(null);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError("You are not logged in. Redirecting to login...");
      setTimeout(() => router.push('/login'), 2000);
      setIsLoading(false);
      return;
    }

    try {
      const [resumeResponse, userResponse, jobseekerResponse] = await Promise.all([
        fetch('https://backend.hyresense.com/api/v1/jobseeker/resumes/', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }),
        fetch('https://backend.hyresense.com/api/v1/jobseeker/users/me/', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }),
        fetch('https://backend.hyresense.com/api/v1/jobseeker/jobseeker-profile/', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })
      ]);

      if (resumeResponse.ok) {
          const resumeApiResponse = await resumeResponse.json();
          const resumes = resumeApiResponse.results;
          if (Array.isArray(resumes) && resumes.length > 0) {
            const defaultResume = resumes.find((r: Resume) => r.is_default) || resumes[0];
            setResumeData(defaultResume);
          }
      } else if (resumeResponse.status !== 404) {
         console.error('Failed to fetch resume data.');
      }

      if (!userResponse.ok) {
          throw new Error('Failed to fetch user details.');
      }
      const userData: UserDetails = await userResponse.json();

      let jobseekerProfileDetails: JobSeekerProfile | null = null;
      if (jobseekerResponse.ok) {
          const jobseekerProfileData = await jobseekerResponse.json();
          if (jobseekerProfileData && jobseekerProfileData.results && jobseekerProfileData.results.length > 0) {
            jobseekerProfileDetails = jobseekerProfileData.results[0];
          }
      } else if (jobseekerResponse.status !== 404) {
          throw new Error('Failed to fetch job seeker profile.');
      }

      const profileName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'User';
      
      let finalAvatarUrl = `https://placehold.co/128x128/e0e7ff/4a5568.png?text=${profileName.split(' ').map(n=>n[0]).join('')}`;

      if (jobseekerProfileDetails?.profile_picture) {
        const imageUrl = jobseekerProfileDetails.profile_picture;
        if (!imageUrl.startsWith('http')) {
          finalAvatarUrl = `http://127.0.0.1:8000${imageUrl}`;
        } else {
          finalAvatarUrl = imageUrl;
        }
      }
      
      if (jobseekerProfileDetails) {
        setUserProfile({
            id: jobseekerProfileDetails.id,
            name: profileName,
            avatarUrl: finalAvatarUrl,
            dataAiHintAvatar: "profile picture",
            title: jobseekerProfileDetails.headline || 'Your Headline',
            location: { city: jobseekerProfileDetails.city, state: jobseekerProfileDetails.state },
            bio: jobseekerProfileDetails.summary || 'Your professional summary.',
            job_status: jobseekerProfileDetails.job_status,
            preferred_job_types: jobseekerProfileDetails.preferred_job_types || [],
            preferred_locations: jobseekerProfileDetails.preferred_locations || [],
            expected_salary: jobseekerProfileDetails.expected_salary,
            willing_to_relocate: jobseekerProfileDetails.willing_to_relocate,
            linkedin_url: jobseekerProfileDetails.linkedin_url,
            portfolio_url: jobseekerProfileDetails.portfolio_url,
            preferred_roles: jobseekerProfileDetails.preferred_roles || [],
            dream_companies: jobseekerProfileDetails.dream_companies || [],
        });
      } else {
         setUserProfile({
            id: '', 
            name: profileName,
            avatarUrl: finalAvatarUrl,
            dataAiHintAvatar: "profile picture placeholder",
            title: 'Your Headline',
            location: { city: '', state: '' },
            bio: 'Your professional summary.',
            job_status: 'actively_looking',
            preferred_job_types: [],
            preferred_locations: [],
            expected_salary: 0,
            willing_to_relocate: false,
            linkedin_url: '',
            portfolio_url: '',
            preferred_roles: [],
            dream_companies: [],
        });
      }

    } catch (err: any) {
      setError(err.message || "An error occurred while fetching your profile.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchProfileData();
  }, [router]);
  
  const handleEditClick = (section: EditableSection) => {
    setEditingSection(section);
  };
  
  const handleCancelEdit = () => {
    setEditingSection(null);
  };
  
 const handleSave = async (data: Partial<UserProfile>, file?: File) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || !userProfile) {
        toast({ title: "Error", description: "Cannot save. User not authenticated or profile missing.", variant: "destructive" });
        return;
    }

    try {
        const nameParts = data.name?.split(' ') || userProfile.name.split(' ');
        const userPayload = {
            first_name: nameParts[0] || '',
            last_name: nameParts.slice(1).join(' ') || ''
        };
        
        await fetch('https://backend.hyresense.com/api/v1/jobseeker/users/me/', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
            body: JSON.stringify(userPayload)
        });

        const formData = new FormData();
        const appendIfDefined = (key: string, value: any) => {
            if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                    value.forEach(item => formData.append(key, item));
                } else if (typeof value === 'boolean') {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, String(value));
                }
            }
        };

        appendIfDefined('headline', data.title);
        appendIfDefined('summary', data.bio);
        appendIfDefined('city', data.location?.city);
        appendIfDefined('state', data.location?.state);
        appendIfDefined('job_status', data.job_status);
        appendIfDefined('expected_salary', data.expected_salary);
        appendIfDefined('willing_to_relocate', data.willing_to_relocate);
        
        if (data.preferred_job_types) data.preferred_job_types.forEach(v => formData.append('preferred_job_types', v));
        if (data.preferred_locations) data.preferred_locations.forEach(v => formData.append('preferred_locations', v));
        if (data.preferred_roles) data.preferred_roles.forEach(v => formData.append('preferred_roles', v));
        if (data.dream_companies) data.dream_companies.forEach(v => formData.append('dream_companies', v));

        if (file) {
            formData.append('profile_picture', file);
        }

        const profileResponse = await fetch(`https://backend.hyresense.com/api/v1/jobseeker/jobseeker-profile/${userProfile.id}/`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${accessToken}` },
            body: formData,
        });

        if (!profileResponse.ok) {
            const errorData = await profileResponse.json();
            throw new Error(Object.entries(errorData).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('; ') || 'Failed to update profile.');
        }

        toast({ title: "Success", description: "Your profile has been updated." });
        handleCancelEdit();
        await fetchProfileData();

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        toast({ title: "Update Failed", description: errorMessage, variant: "destructive" });
    }
  };


  const DesktopProfileContent = () => {
    if (isLoading) return <div className="flex items-center justify-center h-full p-10"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>;
    if (error && !userProfile) { 
      return (
          <div className="max-w-2xl mx-auto my-10">
              <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
              <Button onClick={() => router.push('/login')} className="mt-4">Go to Login</Button>
          </div>
      );
    }
    if (!userProfile) return <div className="text-center py-10"><p>No profile information found.</p><Button onClick={() => router.push('/build-resume')}>Create Profile</Button></div>;

    return (
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-1 space-y-6">
                {editingSection === 'profile' ? (
                    <ProfileEditForm 
                        initialData={userProfile} 
                        onSave={handleSave} 
                        onCancel={handleCancelEdit} 
                    />
                ) : (
                    <SectionCard title="Profile" icon={User} onEdit={() => handleEditClick('profile')}>
                        <div className="p-1 text-center space-y-2">
                            <Avatar className="h-24 w-24 mx-auto mb-2 border-4 border-background ring-2 ring-primary shadow-lg">
                                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint={userProfile.dataAiHintAvatar} />
                                <AvatarFallback className="text-3xl bg-muted">{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold text-foreground">{userProfile.name}</h2>
                            <p className="text-sm text-primary font-medium">{userProfile.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1.5"><MapPin className="h-3 w-3"/> {userProfile.location?.city}, {userProfile.location?.state}</p>
                            <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-xs mx-auto">{userProfile.bio}</p>
                            <div className="flex gap-2 justify-center pt-2">
                                {userProfile.linkedin_url && <Button variant="ghost" size="icon" asChild><a href={userProfile.linkedin_url} target="_blank" rel="noreferrer noopener"><ExternalLink className="h-4 w-4"/></a></Button>}
                                {userProfile.portfolio_url && <Button variant="ghost" size="icon" asChild><a href={userProfile.portfolio_url} target="_blank" rel="noreferrer noopener"><ExternalLink className="h-4 w-4"/></a></Button>}
                            </div>
                        </div>
                    </SectionCard>
                )}
                 {editingSection === 'preferences' ? (
                    <PreferencesEditForm 
                        initialData={userProfile}
                        onSave={handleSave}
                        onCancel={handleCancelEdit}
                    />
                 ) : (
                     <SectionCard title="Job Preferences" icon={Target} onEdit={() => handleEditClick('preferences')}>
                         <>
                            <div className="space-y-2 text-sm">
                                {userProfile.job_status && <div className="flex justify-between"><span>Job Status:</span><span className="font-semibold text-foreground capitalize">{userProfile.job_status.replace(/_/g, ' ')}</span></div>}
                                {userProfile.expected_salary > 0 && <div className="flex justify-between"><span>Expected Salary:</span><span className="font-semibold text-foreground">₹{userProfile.expected_salary.toLocaleString()}</span></div>}
                                <div className="flex justify-between items-center"><span>Willing to Relocate:</span><Badge variant={userProfile.willing_to_relocate ? "default" : "secondary"} className={cn(userProfile.willing_to_relocate ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700", "dark:text-white")}>{userProfile.willing_to_relocate ? 'Yes' : 'No'}</Badge></div>
                            </div>
                            {(userProfile.preferred_job_types?.length > 0) && <div className="pt-2">
                                <h4 className="text-sm font-medium mb-1.5">Preferred Job Types:</h4>
                                <div className="flex flex-wrap gap-1.5">
                                {userProfile.preferred_job_types?.map(t => <Badge key={t} variant="outline" className="capitalize">{t.replace(/_/g, ' ')}</Badge>)}
                                </div>
                            </div>}
                             {(userProfile.preferred_locations?.length > 0) && <div className="pt-2">
                                <h4 className="text-sm font-medium mb-1.5">Preferred Locations:</h4>
                                <div className="flex flex-wrap gap-1.5">
                                {userProfile.preferred_locations?.map(l => <Badge key={l} variant="outline" className="flex items-center gap-1"><MapPin className="h-3 w-3"/>{l}</Badge>)}
                                </div>
                            </div>}
                            {(userProfile.preferred_roles?.length > 0) && <div className="pt-2">
                                <h4 className="text-sm font-medium mb-1.5">Preferred Roles:</h4>
                                <div className="flex flex-wrap gap-1.5">
                                {userProfile.preferred_roles?.map(r => <Badge key={r} variant="outline" className="flex items-center gap-1"><Briefcase className="h-3 w-3"/>{r}</Badge>)}
                                </div>
                            </div>}
                            {(userProfile.dream_companies?.length > 0) && <div className="pt-2">
                                <h4 className="text-sm font-medium mb-1.5">Dream Companies:</h4>
                                <div className="flex flex-wrap gap-1.5">
                                {userProfile.dream_companies?.map(c => <Badge key={c} variant="outline" className="flex items-center gap-1"><Building className="h-3 w-3"/>{c}</Badge>)}
                                </div>
                            </div>}
                        </>
                    </SectionCard>
                 )}
            </div>
    
            <div className="lg:col-span-2 space-y-6">
                {!resumeData ? (
                    <Card className="shadow-xl border-border/40 rounded-xl bg-card/80 backdrop-blur-md overflow-hidden text-center">
                        <CardHeader>
                            <FileText className="mx-auto h-12 w-12 text-primary/30" />
                            <CardTitle className="text-xl">Complete Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">No resume details found. Please create a resume to add your professional information, skills, and experience.</p>
                            <Button className="mt-4" onClick={() => router.push('/create-resume')}>
                                Create Resume
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="flex justify-end">
                            <Button onClick={() => router.push('/edit-profile')}>
                                <Edit3 className="mr-2 h-4 w-4"/> Edit Resume
                            </Button>
                        </div>
                        <SectionCard title="Professional Details" icon={Briefcase}>
                            <div className="space-y-2 text-sm">
                                {resumeData.experience_level && <div className="flex justify-between"><span>Experience:</span><span className="font-semibold text-foreground capitalize">{resumeData.experience_level.replace(/_/g, ' ')}</span></div>}
                                <div className="flex justify-between"><span>Total Experience:</span><span className="font-semibold text-foreground">{resumeData.total_experience_years || 0}y {resumeData.total_experience_months || 0}m</span></div>
                                {resumeData.current_company && <div className="flex justify-between"><span>Current Company:</span><span className="font-semibold text-foreground">{resumeData.current_company}</span></div>}
                                {resumeData.current_designation && <div className="flex justify-between"><span>Designation:</span><span className="font-semibold text-foreground">{resumeData.current_designation}</span></div>}
                                {resumeData.notice_period && <div className="flex justify-between"><span>Notice Period:</span><span className="font-semibold text-foreground capitalize">{resumeData.notice_period.replace(/_/g, ' ')}</span></div>}
                            </div>
                        </SectionCard>
                        <SectionCard title="Experience" icon={Briefcase}>
                            {resumeData.work_experience_data?.length ? (
                                resumeData.work_experience_data.map((exp, i) => (
                                    <ProfileListItem key={exp.id || i} fallbackText={exp.company} title={exp.job_title} subtitle={exp.company} subtitleSecondary={`${exp.start_date} - ${exp.end_date || 'Present'}`}>
                                        <ul className="list-disc list-inside space-y-1 mt-1">
                                            {exp.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                                        </ul>
                                    </ProfileListItem>
                                ))
                            ) : <p className="text-muted-foreground text-sm">No work experience added.</p>}
                        </SectionCard>
                        <SectionCard title="Education" icon={GraduationCap}>
                            {resumeData.education_data?.length ? (
                                resumeData.education_data.map((edu, i) => (
                                    <ProfileListItem key={edu.id || i} fallbackText={edu.institution} title={edu.degree} subtitle={edu.institution} subtitleSecondary={`Graduated: ${edu.end_date} · Grade: ${edu.cgpa}`} />
                                ))
                            ) : <p className="text-muted-foreground text-sm">No education added.</p>}
                        </SectionCard>
                        <SectionCard title="Skills" icon={Award}>
                           {resumeData.skills_data && Object.keys(resumeData.skills_data).length > 0 ? (
                                Object.entries(resumeData.skills_data).map(([category, skillsList]) => (
                                    skillsList.length > 0 && <div key={category} className="mb-2 last:mb-0">
                                        <h4 className="capitalize text-sm font-semibold mb-1.5 text-primary">{category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skillsList.map((skill, i) => (
                                                <Badge key={`${skill}-${i}`} variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary/90 border-primary/30 hover:bg-primary/20 transition-colors shadow-sm">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : <p className="text-muted-foreground text-sm">No skills added.</p>}
                        </SectionCard>
                        <SectionCard title="Projects" icon={FileText}>
                            {resumeData.projects_data?.length ? (
                                resumeData.projects_data.map((proj, i) => (
                                    <ProfileListItem key={proj.id || i} title={proj.project_name} subtitle={proj.url}>
                                        <p>{proj.description}</p>
                                    </ProfileListItem>
                                ))
                            ) : <p className="text-muted-foreground text-sm">No projects added.</p>}
                        </SectionCard>
                        <SectionCard title="Certifications" icon={Award}>
                            {resumeData.certifications_data?.length ? (
                                resumeData.certifications_data.map((cert, i) => (
                                    <ProfileListItem key={cert.id || i} title={cert.certification} subtitle={`Issued: ${cert.year}`} />
                                ))
                            ) : <p className="text-muted-foreground text-sm">No certifications added.</p>}
                        </SectionCard>
                        <SectionCard title="Languages" icon={Languages}>
                            {resumeData.languages_data?.length ? (
                                resumeData.languages_data.map((lang, i) => (
                                    <ProfileListItem key={lang.id || i} title={lang.language} badge={<Badge variant="outline">{lang.proficiency}</Badge>} />
                                ))
                            ) : <p className="text-muted-foreground text-sm">No languages added.</p>}
                        </SectionCard>
                        <SectionCard title="Achievements" icon={Star}>
                            {resumeData.achievements_data?.length ? (
                                 <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    {resumeData.achievements_data.map((ach, i) => (
                                        <li key={i}>{ach}</li>
                                    ))}
                                </ul>
                            ) : <p className="text-muted-foreground text-sm">No achievements added.</p>}
                        </SectionCard>
                        <SectionCard title="Keywords" icon={Sparkles}>
                            {resumeData.keywords?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.keywords.map((keyword, i) => (
                                        <Badge key={`${keyword}-${i}`} variant="secondary" className="text-sm px-3 py-1 bg-accent/10 text-accent/90 border-accent/30">{keyword}</Badge>
                                    ))}
                                </div>
                            ) : <p className="text-muted-foreground text-sm">No keywords added.</p>}
                        </SectionCard>
                    </>
                )}
            </div>
        </div>
      </ScrollArea>
    );
  }
  

  return (
    <>
      <div className="md:hidden">
        <MobileAppLayout activeView="profile" pageTitle="My Profile">
           {isLoading && <div className="flex items-center justify-center h-full"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}
           {error && <div className="p-4"><Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert></div>}
           {!isLoading && !error && userProfile && <div className="bg-muted/20 dark:bg-slate-800/40 h-full"><DesktopProfileContent /></div>}
        </MobileAppLayout>
      </div>

      <div className="hidden md:flex flex-col h-screen bg-muted/30 dark:bg-slate-900/50">
        <AppHeader />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <DesktopProfileContent />
        </main>
      </div>
    </>
  );
}
