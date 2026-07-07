import { NextResponse } from 'next/server';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9+\s-]{8,15}$/, 'Invalid WhatsApp number'),
  unit: z.string().min(1, 'Room or unit number is required'),
  planId: z.enum(['basic', 'comfort', 'full']),
  clusterSlug: z.string().min(1, 'Cluster slug is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate inputs with Zod
    const validatedData = signupSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validatedData.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }
    
    const { name, phone, unit, planId, clusterSlug } = validatedData.data;
    
    // In production, this would persist the registration to a database
    console.log('--- Resident Signup Received ---');
    console.log(`Cluster: ${clusterSlug}`);
    console.log(`Resident: ${name}`);
    console.log(`WhatsApp: ${phone}`);
    console.log(`Unit: ${unit}`);
    console.log(`Plan: ${planId}`);
    
    return NextResponse.json({
      success: true,
      message: 'Signup registered successfully',
      data: {
        name,
        phone,
        unit,
        planId,
        clusterSlug,
      }
    });
  } catch (error) {
    console.error('Error handling signup:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
