'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Zap, Home, Building2, CheckCircle2, Loader2,
  Wifi, Battery, Tv, Wind, Sun, ChevronRight
} from 'lucide-react'

interface MappedPlan {
  id: string
  name: string
  watt: string
  price: string
  sub: string
  description: string
  includes: string[]
  icon: any
  color: string
  badge: string
}

// ── Zod Schemas ────────────────────────────────────────────────

const tenantSchema = z.object({
  fullName:     z.string().min(2, 'Full name must be at least 2 characters'),
  whatsapp:     z.string().length(11, 'WhatsApp number must be exactly 11 digits'),
  email:        z.string().email('Enter a valid email address').optional().or(z.literal('')),
  propertyCode: z.string().length(9, 'Property code must be exactly 9 digits'),
  otpCode:      z.string().length(6, 'Verification code must be exactly 6 digits'),
  planId:       z.string().uuid('Invalid plan selected'),
})

const ownerSchema = z.object({
  name:         z.string().min(2, 'Name must be at least 2 characters'),
  address:      z.string().min(10, 'Please enter the full property address'),
  capacity:     z.string().min(1, 'Please estimate solar/battery capacity'),
  contact:      z.string().min(7, 'Enter a valid email or phone number'),
})

type TenantForm = z.infer<typeof tenantSchema>
type OwnerForm  = z.infer<typeof ownerSchema>

// Helper to parse plan description split by ||
const parsePlanDescription = (desc: string) => {
  if (!desc) return { description: '', includes: [] }
  const parts = desc.split('||')
  const mainDesc = parts[0].trim()
  let includes: string[] = []
  if (parts.length > 1) {
    includes = parts[1]
      .split(',')
      .map(item => item.trim().replace(/^['"]|['"]$/g, '').trim())
      .filter(item => item.length > 0)
  }
  return { description: mainDesc, includes }
}

const mapBackendPlan = (plan: any): MappedPlan => {
  const parsedDesc = parsePlanDescription(plan.description)
  
  let Icon = Sun
  let color = 'blue'
  let badge = ''
  
  if (plan.sortOrder === 1) {
    Icon = Wifi
    color = 'emerald'
  } else if (plan.sortOrder === 2) {
    Icon = Tv
    color = 'blue'
    badge = 'Most popular'
  } else if (plan.sortOrder === 3) {
    Icon = Wind
    color = 'blue'
  }

  return {
    id: plan.id,
    name: plan.name,
    watt: `${(plan.maxPowerDemandWatts || 0).toLocaleString()}W`,
    price: `₦${(plan.amount || 0).toLocaleString()}`,
    sub: '/month',
    description: parsedDesc.description,
    includes: parsedDesc.includes,
    icon: Icon,
    color,
    badge
  }
}

// ── Tier Card ──────────────────────────────────────────────────

function TierCard({
  tier,
  selected,
  onSelect,
}: {
  tier: MappedPlan
  selected: boolean
  onSelect: () => void
}) {
  const isBlue    = tier.color === 'blue'
  const accentClr = isBlue ? '#3b82f6' : '#10B981'
  const accentBg  = isBlue ? 'rgba(59,130,246,0.08)' : 'rgba(16,185,129,0.08)'
  const accentBdr = isBlue ? 'rgba(59,130,246,0.3)' : 'rgba(16,185,129,0.3)'
  const Icon      = tier.icon

  return (
    <button
      type="button"
      onClick={onSelect}
      className="tier-card text-left w-full rounded-2xl p-5 glass-card"
      style={{
        borderColor: selected ? accentClr : 'rgba(30,45,69,0.8)',
        borderWidth: '2px',
        boxShadow: selected ? `0 0 0 1px ${accentClr}22, 0 8px 32px ${accentClr}18` : 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' }}>
            {tier.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: selected ? accentBg : 'rgba(30,45,69,0.4)', border: `1px solid ${selected ? accentBdr : 'transparent'}` }}>
          <Icon className="w-5 h-5" style={{ color: selected ? accentClr : '#64748B' }} />
        </div>
        <div>
          <p className="font-display font-bold text-white text-base leading-none">{tier.name}</p>
          <p className="text-xs font-mono mt-0.5" style={{ color: accentClr }}>{tier.watt} cap</p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <span className="font-display text-2xl font-extrabold" style={{ color: selected ? accentClr : '#CBD5E1' }}>
          {tier.price}
        </span>
        <span className="text-xs text-brand-muted ml-1">{tier.sub}</span>
      </div>

      <p className="text-xs text-brand-muted leading-relaxed mb-3">{tier.description}</p>

      {/* Includes */}
      <ul className="space-y-1.5">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#94A3B8' }}>
            <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: accentClr }} />
            {item}
          </li>
        ))}
      </ul>

      {/* Selected indicator */}
      {selected && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: accentClr }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentClr }} />
          Selected
        </div>
      )}
    </button>
  )
}

// ── Tenant Form ────────────────────────────────────────────────

function TenantSignupForm({
  selectedPlanId,
  plans,
  onSuccess,
}: {
  selectedPlanId: string
  plans: any[]
  onSuccess: () => void
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TenantForm>({
    resolver: zodResolver(tenantSchema),
    defaultValues: { planId: selectedPlanId },
  })

  // Sync external planId selection into form
  useEffect(() => {
    if (selectedPlanId) {
      setValue('planId', selectedPlanId)
    }
  }, [selectedPlanId, setValue])

  const whatsappNumber = watch('whatsapp')
  const fullName = watch('fullName')
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [lastSentNumber, setLastSentNumber] = useState('')
  const [apiError, setApiError] = useState<string | null>(null)

  // Auto-trigger OTP when whatsapp number hits exactly 11 digits
  useEffect(() => {
    const triggerOtp = async () => {
      if (whatsappNumber && whatsappNumber.length === 11) {
        if (whatsappNumber === lastSentNumber) {
          return // Already sent OTP for this number
        }
        setIsSendingOtp(true)
        setApiError(null)
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
          const res = await fetch(`${baseUrl}/v1/Onboarding/Send-Otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: whatsappNumber, name: fullName || null }),
          })

          const data = await res.json().catch(() => ({}))
          if (!res.ok || data.status === false) {
            throw new Error(data.message || 'Failed to send verification code. Please check the number.')
          }

          setOtpSent(true)
          setLastSentNumber(whatsappNumber)
        } catch (err: any) {
          setApiError(err.message)
          setOtpSent(false)
        } finally {
          setIsSendingOtp(false)
        }
      } else {
        if (otpSent && whatsappNumber && whatsappNumber.length < 11) {
          setOtpSent(false)
        }
      }
    }

    triggerOtp()
  }, [whatsappNumber, lastSentNumber, otpSent, setValue, fullName])

  // Helper to strip non-digits from the property code
  const cleanPropertyCode = (code: string): string => {
    return code.replace(/\D/g, '')
  }

  const onSubmit = async (data: TenantForm) => {
    setApiError(null)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
      const cleanedPropertyCode = cleanPropertyCode(data.propertyCode)
      const propertyCodeDigit = parseInt(cleanedPropertyCode, 10)
      const payload = {
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email || null,
        propertyCode: propertyCodeDigit,
        planId: data.planId,
        otpCode: data.otpCode,
      }

      const res = await fetch(`${baseUrl}/v1/Onboarding/Customer/Self`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const respData = await res.json().catch(() => ({}))
      if (!res.ok || respData.status === false) {
        throw new Error(respData.message || 'Failed to submit registration. Please try again.')
      }

      onSuccess()
    } catch (err: any) {
      setApiError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {apiError && (
        <div className="p-4 rounded-xl text-sm bg-red-500/10 border border-red-500/20 text-red-400">
          {apiError}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label">Full name</label>
          <input
            {...register('fullName')}
            placeholder="e.g. Amara Johnson"
            className={`field-input ${errors.fullName ? 'error' : ''}`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-400 mt-1.5">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">WhatsApp number</label>
          <div className="relative">
            <input
              {...register('whatsapp', {
                onChange: (e) => {
                  const clean = e.target.value.replace(/\D/g, '').slice(0, 11)
                  setValue('whatsapp', clean)
                }
              })}
              placeholder="e.g. 08012345678"
              className={`field-input ${errors.whatsapp ? 'error' : ''}`}
            />
            {isSendingOtp && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-xs text-blue-400">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
            {otpSent && !isSendingOtp && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Sent
              </div>
            )}
          </div>
          {errors.whatsapp && (
            <p className="text-xs text-red-400 mt-1.5">{errors.whatsapp.message}</p>
          )}
          {isSendingOtp && (
            <p className="text-xs text-blue-400 mt-1.5 animate-pulse">Sending verification code to WhatsApp...</p>
          )}
        </div>

        <div>
          <label className="field-label">Email (optional)</label>
          <input
            {...register('email')}
            placeholder="you@email.com"
            className={`field-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Property code</label>
          <input
            {...register('propertyCode', {
              onChange: (e) => {
                const clean = e.target.value.replace(/\D/g, '').slice(0, 9)
                setValue('propertyCode', clean)
              }
            })}
            placeholder="e.g. 123456789"
            maxLength={9}
            className={`field-input font-mono tracking-widest ${errors.propertyCode ? 'error' : ''}`}
          />
          <p className="text-xs text-brand-muted mt-1.5">
            Get this 9-digit code from your property partner or manager.
          </p>
          {errors.propertyCode && (
            <p className="text-xs text-red-400 mt-1">{errors.propertyCode.message}</p>
          )}
        </div>
      </div>

      {/* Hidden planId field synced from selector */}
      <input type="hidden" {...register('planId')} />

      {otpSent && (
        <>
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <label className="field-label">Verification code</label>
            <input
              {...register('otpCode', {
                onChange: (e) => {
                  const clean = e.target.value.replace(/\D/g, '').slice(0, 6)
                  setValue('otpCode', clean)
                }
              })}
              placeholder="Enter 6-digit WhatsApp code"
              className={`field-input font-mono text-center tracking-widest ${errors.otpCode ? 'error' : ''}`}
            />
            {errors.otpCode && (
              <p className="text-xs text-red-400 mt-1.5">{errors.otpCode.message}</p>
            )}
          </div>

          {/* Current plan summary */}
          {(() => {
            const selectedPlan = plans.find(p => p.id === selectedPlanId)
            if (!selectedPlan) return null
            const mapped = mapBackendPlan(selectedPlan)
            return (
              <div className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', animation: 'fadeIn 0.3s ease-out' }}>
                <Sun className="w-4 h-4 text-blue-400 shrink-0" />
                <p className="text-sm text-brand-text">
                  Subscribing to{' '}
                  <span className="font-semibold text-blue-400">
                    {mapped.name} Plan
                  </span>
                  {' '}({mapped.watt} cap)
                </p>
                <span className="ml-auto text-sm font-bold text-blue-400">
                  {mapped.price}
                  <span className="text-xs text-brand-muted font-normal">/mo</span>
                </span>
              </div>
            )
          })()}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white font-display text-base disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" fill="white" />
                Request power access
              </>
            )}
          </button>
        </>
      )}
    </form>
  )
}

// ── Owner Form ─────────────────────────────────────────────────

const CAPACITY_OPTIONS = [
  'Under 1kW (starter system)',
  '1 – 3kW (small property)',
  '3 – 5kW (medium block)',
  '5 – 10kW (large facility)',
  '10kW+ (commercial)',
]

function OwnerRegistrationForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OwnerForm>({ resolver: zodResolver(ownerSchema) })

  const onSubmit = async (data: OwnerForm) => {
    await new Promise((r) => setTimeout(r, 1800))
    console.log('Owner registration:', data)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="field-label">Your name</label>
          <input
            {...register('name')}
            placeholder="e.g. Mr. Emeka Obi"
            className={`field-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1.5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="field-label">Contact (email or phone)</label>
          <input
            {...register('contact')}
            placeholder="you@email.com or 0801..."
            className={`field-input ${errors.contact ? 'error' : ''}`}
          />
          {errors.contact && (
            <p className="text-xs text-red-400 mt-1.5">{errors.contact.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="field-label">Property address</label>
        <input
          {...register('address')}
          placeholder="e.g. 12 Adeleke Close, Surulere, Lagos"
          className={`field-input ${errors.address ? 'error' : ''}`}
        />
        {errors.address && (
          <p className="text-xs text-red-400 mt-1.5">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="field-label">Estimated solar / battery capacity</label>
        <select
          {...register('capacity')}
          className={`field-input appearance-none ${errors.capacity ? 'error' : ''}`}
          style={{ cursor: 'pointer' }}>
          <option value="" style={{ background: '#0D1525' }}>Select capacity range…</option>
          {CAPACITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ background: '#0D1525' }}>{opt}</option>
          ))}
        </select>
        {errors.capacity && (
          <p className="text-xs text-red-400 mt-1.5">{errors.capacity.message}</p>
        )}
      </div>

      <div className="p-4 rounded-xl"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div className="flex items-start gap-3">
          <Battery className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-brand-text leading-relaxed">
            As a property partner, Gridlett provisions the control layer on your existing solar infrastructure.
            You keep ownership of the hardware; we handle subscriptions, monitoring, and fair usage enforcement.
            Revenue share is paid monthly.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white font-display text-base disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #065F46, #10B981)', boxShadow: '0 4px 20px rgba(16,185,129,0.25)' }}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Building2 className="w-5 h-5" />
            Register my property
          </>
        )}
      </button>
    </form>
  )
}

// ── Success State ──────────────────────────────────────────────

function SuccessState({
  type,
  onReset,
}: {
  type: 'tenant' | 'owner'
  onReset: () => void
}) {
  const isTenant = type === 'tenant'
  const accentClr = isTenant ? '#3b82f6' : '#10B981'

  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      {/* Animated checkmark */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full opacity-20 animate-ping"
          style={{ background: accentClr }} />
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${accentClr}22, transparent)`,
            border: `2px solid ${accentClr}44`,
          }}>
          <CheckCircle2 className="w-12 h-12" style={{ color: accentClr }} />
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold text-white mb-3">
        Registration received!
      </h3>
      <p className="text-brand-text max-w-sm leading-relaxed text-sm mb-2">
        {isTenant
          ? "We've got your request. Connect with your property partner to activate your Gridlett subscription and start getting reliable power."
          : "Welcome to the Gridlett partner network. Our team will reach out within 24 hours to walk you through the provisioning process."}
      </p>
      <p className="text-xs text-brand-muted mb-8">
        Questions? Email{' '}
        <a href="mailto:operations@gridlett.com" className="hover:text-blue-400 transition-colors underline underline-offset-2">
          operations@gridlett.com
        </a>
      </p>

      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:opacity-80"
        style={{ border: `1px solid ${accentClr}33`, color: accentClr }}>
        ← Submit another registration
      </button>
    </div>
  )
}

// ── Tier Card Skeleton ─────────────────────────────────────────

function TierCardSkeleton() {
  return (
    <div
      className="w-full rounded-2xl p-5 glass-card border animate-pulse min-h-[260px] flex flex-col justify-between"
      style={{
        borderColor: 'rgba(30,45,69,0.8)',
        borderWidth: '2px',
      }}
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-800/80" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-800/80 rounded w-2/3" />
            <div className="h-3 bg-slate-800/80 rounded w-1/3" />
          </div>
        </div>
        <div className="h-6 bg-slate-800/80 rounded w-1/2 mb-4" />
        <div className="h-3 bg-slate-800/80 rounded w-5/6 mb-2" />
        <div className="h-3 bg-slate-800/80 rounded w-2/3" />
      </div>
      <div className="space-y-2 mt-4">
        <div className="h-3 bg-slate-800/80 rounded w-11/12" />
        <div className="h-3 bg-slate-800/80 rounded w-9/12" />
      </div>
    </div>
  )
}

// ── Main SignupSection ─────────────────────────────────────────

export default function SignupSection() {
  const [activeTab, setActiveTab]           = useState<'tenant' | 'owner'>('tenant')
  const [plans, setPlans]                   = useState<any[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState<string>('')
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true)
  const [successState, setSuccessState]     = useState<null | 'tenant' | 'owner'>(null)

  const handleSuccess = () => setSuccessState(activeTab)
  const handleReset   = () => setSuccessState(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
        const res = await fetch(`${baseUrl}/v1/Plan/Get/System`)
        const data = await res.json()
        if (data.status && Array.isArray(data.data)) {
          const sortedPlans = [...data.data].sort((a: any, b: any) => a.sortOrder - b.sortOrder)
          setPlans(sortedPlans)
          
          // Select standard plan (sortOrder = 2) by default, or fallback to first plan
          const standardPlan = sortedPlans.find((p: any) => p.sortOrder === 2)
          if (standardPlan) {
            setSelectedPlanId(standardPlan.id)
          } else if (sortedPlans.length > 0) {
            setSelectedPlanId(sortedPlans[0].id)
          }
        }
      } catch (err) {
        console.error('Failed to fetch system plans:', err)
      } finally {
        setIsLoadingPlans(false)
      }
    }

    fetchPlans()
  }, [])

  return (
    <section id="signup" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">Get started</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Choose your{' '}
            <span className="text-gradient-blue">power tier</span>
            , then sign up
          </h2>
          <p className="mt-4 text-brand-text max-w-lg mx-auto text-sm leading-relaxed">
            Pick the usage level that fits your needs. Then register as a tenant or property partner below.
          </p>
        </div>

        {/* Tier Selector */}
        <div id="tiers" className="grid md:grid-cols-3 gap-4 mb-12">
          {isLoadingPlans ? (
            <>
              <TierCardSkeleton />
              <TierCardSkeleton />
              <TierCardSkeleton />
            </>
          ) : plans.length > 0 ? (
            plans.map((plan) => {
              const mapped = mapBackendPlan(plan)
              return (
                <TierCard
                  key={mapped.id}
                  tier={mapped}
                  selected={selectedPlanId === mapped.id}
                  onSelect={() => setSelectedPlanId(mapped.id)}
                />
              )
            })
          ) : (
            <div className="col-span-3 text-center py-8 text-brand-muted text-sm glass-card rounded-2xl border border-brand-border/40">
              No plans found. Please check back later.
            </div>
          )}
        </div>

        {/* Signup Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>

            {/* Tab bar */}
            {!successState && (
              <div className="flex border-b border-brand-border/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('tenant')}
                  className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all relative"
                  style={{
                    color: activeTab === 'tenant' ? '#3b82f6' : '#64748B',
                    background: activeTab === 'tenant' ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                  }}>
                  <Home className="w-4 h-4" />
                  I&apos;m a tenant
                  {activeTab === 'tenant' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-t-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('owner')}
                  className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all relative"
                  style={{
                    color: activeTab === 'owner' ? '#10B981' : '#64748B',
                    background: activeTab === 'owner' ? 'rgba(16,185,129,0.05)' : 'transparent',
                  }}>
                  <Building2 className="w-4 h-4" />
                  I&apos;m a property partner
                  {activeTab === 'owner' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-t-full" />
                  )}
                </button>
              </div>
            )}

            {/* Form / Success body */}
            <div className="p-7 md:p-8">
              {successState ? (
                <SuccessState type={successState} onReset={handleReset} />
              ) : activeTab === 'tenant' ? (
                <>
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-white text-xl">Tenant sign up</h3>
                    <p className="text-sm text-brand-muted mt-1">
                      Join an existing Gridlett-enabled property using your property code.
                    </p>
                  </div>
                  <TenantSignupForm
                    selectedPlanId={selectedPlanId}
                    plans={plans}
                    onSuccess={handleSuccess}
                  />
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-white text-xl">Property partner registration</h3>
                    <p className="text-sm text-brand-muted mt-1">
                      List your property and let Gridlett manage structured energy access for your tenants.
                    </p>
                  </div>
                  <OwnerRegistrationForm onSuccess={handleSuccess} />
                </>
              )}
            </div>
          </div>

          {/* Trust footer */}
          {!successState && (
            <p className="text-center text-xs text-brand-muted mt-5 flex items-center justify-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-emerald-500" />
              No payment due at signup. Activation handled by your property partner.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
