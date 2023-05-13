export class teisInvoices{
  // ID!: number;
  // Billing_Org!: string;
  // Billing_Dept!: string;
  // Charged_Org!: string;
  // Charged_Org_Name!:  string;
  // Charged_Dep!:  string;
  // Fiscal_Month!:  string;
  // Charged_Type!:  string;
  // Charged_Unit!:  string;
  // Charged_Amount!: number;
  // Billable_Amount!:  string;
  // Hyperion_Profit_Center!:  string;
  // SAP_Profit_Center!:  string;
  // Charged_Category!:  string;
  // Revenue_Type!:  string;
  // Charged_entity!:  string;
  // Year!:  number;
  // Month!:  String;
  constructor(
    public ID: number,
    public Billing_Org: string,
    public Billing_Dept: string,
    public Charged_Org: string,
    public Charged_Org_Name: string,
    public Charged_Dep: string,
    public Fiscal_Month: string,
    public Charged_Type: string,
    public Charged_Unit: string,
    public Charged_Amount: number,
    public Billable_Amount: string,
    public Hyperion_Profit_Center: string,
    public SAP_Profit_Center: string,
    public Charged_Category: string,
    public Revenue_Type: string,
    public Charged_entity: string,
    public Year: number,
    public Month: string
  ) {}

}
