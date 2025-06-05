import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fpvalcjixpmsydkbpyib.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdmFsY2ppeHBtc3lka2JweWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTUwNjUsImV4cCI6MjA1NzI5MTA2NX0.3gx-lZwBrkXttNO9bEy-jBu-0KvH-OC-8JspE3Ft1tk';

export const supabase = createClient(supabaseUrl, supabaseKey)