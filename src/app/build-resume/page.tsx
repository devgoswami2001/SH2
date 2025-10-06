
'use client';

import React, { useState, useEffect, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, User, MapPin, Phone, Globe, Briefcase, Target, DollarSign, Link as LinkIcon, Lock, AlertCircle, Loader2, Building, X } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const SectionWrapper: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <Card className="bg-card/80 backdrop-blur-md shadow-lg border border-border/30 rounded-xl mb-6 last:mb-0">
    <CardHeader>
      <CardTitle className="text-xl md:text-2xl font-semibold text-primary flex items-center">
        {icon}
        <span className="ml-3">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 md:space-y-6">
      {children}
    </CardContent>
  </Card>
);

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
    "JPMorgan Chase", "Bank of America", "Wells Fargo", "Citigroup", "Goldman Sachs", "Morgan Stanley", "Berkshire Hathaway", "Visa", "Mastercard", "American Express", "BlackRock", "Charles Schwab", "State Street", "Fidelity Investments", "T. Rowe Price", "HDFC Bank", "Industrial and Commercial Bank of China", "China Construction Bank", "Royal Bank of Canada", "Commonwealth Bank of Australia",
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
    "AIG", "Prudential Financial", "MetLife", "Aflac", "Progressive", "Allstate", "Travelers Companies", "Chubb", "Hartford Financial Services",
    // Luxury Brands
    "LVMH", "Hermès", "Kering", "Richemont", "Chanel", "Burberry", "Ralph Lauren", "Coach (Tapestry)", "Michael Kors (Capri Holdings)", "Tiffany & Co.",
    // Sports & Fitness
    "Nike", "Adidas", "Puma", "Under Armour", "Lululemon", "New Balance", "Reebok", "Asics", "Skechers", "VF Corporation",
    // Gaming Companies
    "Roblox", "Unity Software", "Epic Games", "Valve Corporation", "Riot Games", "Blizzard Entertainment", "King Digital Entertainment", "Supercell", "Machine Zone", "Zynga"
];

const unique_big_companies = [...new Set(big_companies)];

export default function BuildProfilePage() {
  const [pageContainerRef, isPageContainerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  const router = useRouter();
  const { toast } = useToast();
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    date_of_birth: '',
    gender: '',
    phone_number: '',
    address_line_1: '',
    city: '',
    state: '',
    country: 'India',
    postal_code: '',
    headline: '',
    summary: '',
    job_status: 'actively_looking',
    preferred_job_types: [] as string[],
    preferred_locations: '',
    expected_salary: '',
    willing_to_relocate: false,
    linkedin_url: '',
    portfolio_url: '',
    profile_visibility: true,
    allow_recruiter_contact: true,
    preferred_roles: [] as string[],
    dream_companies: [] as string[],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast({ title: "Unauthorized", description: "Please log in to continue.", variant: "destructive" });
        router.push('/login');
        return;
      }
      
      setIsFetching(true);
      try {
        const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/jobseeker-profile/', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const profile = data.results[0];
                setProfileId(profile.id);
                setFormData({
                    date_of_birth: profile.date_of_birth || '',
                    gender: profile.gender || '',
                    phone_number: profile.phone_number || '',
                    address_line_1: profile.address_line_1 || '',
                    city: profile.city || '',
                    state: profile.state || '',
                    country: profile.country || 'India',
                    postal_code: profile.postal_code || '',
                    headline: profile.headline || '',
                    summary: profile.summary || '',
                    job_status: profile.job_status || 'actively_looking',
                    preferred_job_types: profile.preferred_job_types || [],
                    preferred_locations: (profile.preferred_locations || []).join(', '),
                    expected_salary: profile.expected_salary?.toString() || '',
                    willing_to_relocate: profile.willing_to_relocate || false,
                    linkedin_url: profile.linkedin_url || '',
                    portfolio_url: profile.portfolio_url || '',
                    profile_visibility: profile.profile_visibility ?? true,
                    allow_recruiter_contact: profile.allow_recruiter_contact ?? true,
                    preferred_roles: profile.preferred_roles || [],
                    dream_companies: profile.dream_companies || [],
                });
            }
        } else if (response.status !== 404) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to fetch profile.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, [router, toast]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: keyof typeof formData, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };
  
  const handleRadioGroupChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleJobTypeChange = (jobType: string) => {
    setFormData(prev => {
        const newJobTypes = prev.preferred_job_types.includes(jobType)
            ? prev.preferred_job_types.filter(type => type !== jobType)
            : [...prev.preferred_job_types, jobType];
        return { ...prev, preferred_job_types: newJobTypes };
    });
  };

  const handleArrayInputChange = (e: React.KeyboardEvent<HTMLInputElement>, field: 'preferred_roles' | 'dream_companies') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !formData[field].includes(value)) {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], value] }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeArrayItem = (index: number, field: 'preferred_roles' | 'dream_companies') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    let processedLinkedinUrl = formData.linkedin_url.trim();
    if (processedLinkedinUrl && !/^https?:\/\//i.test(processedLinkedinUrl)) {
      processedLinkedinUrl = 'https://' + processedLinkedinUrl;
    }

    if (processedLinkedinUrl && !isValidUrl(processedLinkedinUrl)) {
      setError("The LinkedIn Profile URL is not valid. Please check and try again.");
      setIsLoading(false);
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        setError("You are not logged in.");
        setIsLoading(false);
        router.push('/login');
        return;
    }

    try {
        const payload = {
            ...formData,
            linkedin_url: processedLinkedinUrl,
            preferred_locations: formData.preferred_locations.split(',').map(s => s.trim()).filter(Boolean),
            expected_salary: formData.expected_salary ? parseInt(formData.expected_salary, 10) : null,
        };

        const url = profileId
          ? `https://backend.hyresense.com/api/v1/jobseeker/jobseeker-profile/${profileId}/`
          : 'https://backend.hyresense.com/api/v1/jobseeker/jobseeker-profile/';

        const method = profileId ? 'PATCH' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = Object.values(errorData).flat().join(' ');
            throw new Error(errorMessage || 'Failed to save profile. Please check your inputs.');
        }
        
        toast({ title: "Success!", description: "Your profile has been saved." });
        router.push('/edit-profile');

    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-animated">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
        </div>
    );
  }

  return (
    <div
      ref={pageContainerRef}
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out",
        isPageContainerVisible && "opacity-100 translate-y-0"
      )}
    >
      <div className="absolute inset-0 opacity-20 dark:opacity-15"></div>

      <div className="w-full max-w-4xl z-10 py-12">
        <form onSubmit={handleSaveProfile}>
            <header className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground">Build Your Profile</h1>
                  <p className="text-muted-foreground mt-1">This information will help our AI find the best matches for you.</p>
                </div>
                <Button type="submit" size="lg" className="h-11 text-base font-semibold group bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Saving...</> : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Save & Continue
                        </>
                    )}
                </Button>
            </header>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <SectionWrapper title="Personal Information" icon={<User className="h-6 w-6" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                        <Input id="date_of_birth" name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>Gender</Label>
                        <Select name="gender" onValueChange={(value) => handleSelectChange('gender', value)} value={formData.gender}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div>
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input id="phone_number" name="phone_number" type="tel" placeholder="+919876543210" value={formData.phone_number} onChange={handleInputChange} />
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Location" icon={<MapPin className="h-6 w-6" />}>
                 <div>
                    <Label htmlFor="address_line_1">Address Line 1</Label>
                    <Input id="address_line_1" name="address_line_1" placeholder="123 Street Name" value={formData.address_line_1} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" placeholder="e.g., Mumbai" value={formData.city} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" placeholder="e.g., Maharashtra" value={formData.state} onChange={handleInputChange} />
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="postal_code">Postal Code</Label>
                        <Input id="postal_code" name="postal_code" placeholder="e.g., 400001" value={formData.postal_code} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" value={formData.country} onChange={handleInputChange} />
                    </div>
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Professional Details" icon={<Briefcase className="h-6 w-6" />}>
                 <div>
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" name="headline" placeholder="e.g., Full Stack Developer | AI Enthusiast" value={formData.headline} onChange={handleInputChange} />
                </div>
                 <div>
                    <Label htmlFor="summary">Summary / Bio</Label>
                    <Textarea id="summary" name="summary" placeholder="Experienced developer with 5+ years in web development..." rows={4} value={formData.summary} onChange={handleInputChange} />
                </div>
            </SectionWrapper>

            <SectionWrapper title="Job Preferences" icon={<Target className="h-6 w-6" />}>
                <div>
                    <Label>Current Job Status</Label>
                     <RadioGroup name="job_status" onValueChange={(value) => handleRadioGroupChange('job_status', value)} value={formData.job_status} className="flex flex-col md:flex-row gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="actively_looking" id="status-active" />
                            <Label htmlFor="status-active">Actively Looking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="passively_looking" id="status-passive" />
                            <Label htmlFor="status-passive">Passively Looking</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="not_looking" id="status-not" />
                            <Label htmlFor="status-not">Not Looking</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div>
                    <Label>Preferred Job Types</Label>
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                        {['full_time', 'part_time', 'contract', 'remote', 'internship'].map(type => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox id={`type-${type}`} onCheckedChange={() => handleJobTypeChange(type)} checked={formData.preferred_job_types.includes(type)} />
                                <Label htmlFor={`type-${type}`} className="capitalize">{type.replace('_', ' ')}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Label htmlFor="preferred_locations">Preferred Locations (comma-separated)</Label>
                    <Input id="preferred_locations" name="preferred_locations" placeholder="e.g., Mumbai, Pune, Bangalore" value={formData.preferred_locations} onChange={handleInputChange} />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="preferred_roles">Preferred Roles (Press Enter to add)</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] bg-muted/50">
                        {formData.preferred_roles.map((role, index) => (
                        <Badge key={index} variant="secondary" className="pl-2 pr-1 py-0.5 text-sm bg-primary/20 text-primary-foreground border-primary/50">
                            {role}
                            <button type="button" onClick={() => removeArrayItem(index, 'preferred_roles')} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"><X className="h-3 w-3"/></button>
                        </Badge>
                        ))}
                    </div>
                    <Input 
                      id="preferred_roles" 
                      placeholder="Type a role and press Enter..." 
                      list="job-roles-list" 
                      onKeyDown={(e) => handleArrayInputChange(e, 'preferred_roles')} 
                    />
                    <datalist id="job-roles-list">
                      {job_roles.map((role) => (
                        <option key={role} value={role} />
                      ))}
                    </datalist>
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="dream_companies">Dream Companies (Press Enter to add)</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] bg-muted/50">
                        {formData.dream_companies.map((company, index) => (
                        <Badge key={index} variant="secondary" className="pl-2 pr-1 py-0.5 text-sm bg-accent/20 text-accent-foreground border-accent/50">
                            {company}
                            <button type="button" onClick={() => removeArrayItem(index, 'dream_companies')} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5"><X className="h-3 w-3"/></button>
                        </Badge>
                        ))}
                    </div>
                    <Input 
                      id="dream_companies" 
                      placeholder="Type a company and press Enter..." 
                      list="dream-companies-list" 
                      onKeyDown={(e) => handleArrayInputChange(e, 'dream_companies')} 
                    />
                    <datalist id="dream-companies-list">
                      {unique_big_companies.map((company) => (
                        <option key={company} value={company} />
                      ))}
                    </datalist>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="expected_salary">Expected Annual Salary (INR)</Label>
                        <Input id="expected_salary" name="expected_salary" type="number" placeholder="e.g., 800000" value={formData.expected_salary} onChange={handleInputChange} />
                    </div>
                     <div className="flex items-center space-x-4 pt-6">
                        <Checkbox id="willing_to_relocate" name="willing_to_relocate" onCheckedChange={(checked) => handleCheckboxChange('willing_to_relocate', Boolean(checked))} checked={formData.willing_to_relocate} />
                        <Label htmlFor="willing_to_relocate" className="text-base">Willing to relocate for the right opportunity?</Label>
                    </div>
                </div>
            </SectionWrapper>

             <SectionWrapper title="Online Presence" icon={<LinkIcon className="h-6 w-6" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
                        <Input id="linkedin_url" name="linkedin_url" placeholder="https://linkedin.com/in/yourprofile" value={formData.linkedin_url} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="portfolio_url">Portfolio/Website URL</Label>
                        <Input id="portfolio_url" name="portfolio_url" placeholder="https://yourportfolio.dev" value={formData.portfolio_url} onChange={handleInputChange} />
                    </div>
                </div>
            </SectionWrapper>
            
            <SectionWrapper title="Privacy Settings" icon={<Lock className="h-6 w-6" />}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
                        <Label htmlFor="profile_visibility" className="font-medium">Profile Visibility</Label>
                        <Switch id="profile_visibility" name="profile_visibility" onCheckedChange={(checked) => handleCheckboxChange('profile_visibility', checked)} checked={formData.profile_visibility} />
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-md bg-muted/40">
                        <Label htmlFor="allow_recruiter_contact" className="font-medium">Allow Recruiter Contact</Label>
                        <Switch id="allow_recruiter_contact" name="allow_recruiter_contact" onCheckedChange={(checked) => handleCheckboxChange('allow_recruiter_contact', checked)} checked={formData.allow_recruiter_contact} />
                    </div>
                </div>
            </SectionWrapper>

        </form>
      </div>

      <style jsx global>{`
        @keyframes pulse_slow_bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-gradient-animated {
          background: linear-gradient(-45deg, hsl(var(--background)) 30%, hsl(var(--primary)/0.05) 50%, hsl(var(--accent)/0.05) 70%, hsl(var(--background)) 90%);
          background-size: 400% 400%;
          animation: pulse_slow_bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
