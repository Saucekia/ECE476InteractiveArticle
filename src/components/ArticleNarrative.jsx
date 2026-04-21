import { useEffect, useRef } from 'react'

//const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis.'

const BOXES = [
  { id: 1,  title: 'What is a Section 8 Voucher?',   activation: 0.05 , text: "Section 8 Housing Vouchers, a part of the Housing Choice Voucher Program, is a federal rental assistance program managed by the U.S. Department of Housing and Urban Development (HUD). It assists low-income families, seniors, and people with disabilities to afford safe, private-market housing."},
  { id: 2,  title: 'Who Can be a Voucher Holder?',   activation: 0.15 , text: "Section 8 eligibility requires a “Very Low” annual income, defined as below 50% of the local Area Median Income (HUD)."},
  { id: 3,  title: 'Steering',                       activation: 0.25 , text: "Steering Property owner limits prospective tenants to specific properties, or deny knowing what a section 8 voucher is."},
  { id: 4,  title: 'Ghosting',                       activation: 0.35 , text: "GhostingLandlords/brokers stop responding to section 8 voucher holders requests."},
  { id: 5,  title: 'Direct Rejection',               activation: 0.45 , text: "Direct rejection Property owner outwardly says that they don’t accept housing vouchers."},
  { id: 6,  title: '',                               activation: 0.55 , text: "[Finding a property that accepts vouchers is really hard. Renters face discrimination, as landlords have negative perceptions of  voucher holders]"},
  { id: 7,  title: '',                               activation: 0.65 , text: "While explicit refusals are illegal in many states, our data reveals that voucher holders are frequently met with a pattern of silence and evasion. Text message sting operations are conducted by HRI in Los Angeles and San Francisco, CA. "},
  { id: 8,  title: 'Why the Denials?',               activation: 0.75 , text: "In our investigation, we found that landlords sometimes deny Section 8 Voucher holders because they do not wish to go through the inspection process of their property in fear of losing money."},
  { id: 9,  title: 'How its going unnoticed...',     activation: 0.85 , text: "The 2020-2023 housing shortage in CA accelerated ghosting as landlords had too many applicants and could choose to ignore protected classes without being caught. (Cal Matters)"},
  { id: 10, title: 'Taking Advantage of Shortages',  activation: 0.95 , text: "The Housing Rights Initiative (HRI) is a national non-profit watchdog group that investigates real estate fraud, connects tenants to legal services, and protects fair and affordable housing. HRI conducts undercover testing of landlords and brokers to verify compliance with fair housing laws. "},
]

// Container is 1100vh tall, viewport is 100vh → maxScroll = 1000vh.
// At progress P the viewport top sits at P * 1000vh inside the container.
// Place each box at (P * 1000 + 20)vh so it appears 20vh from the viewport top.
export default function ArticleNarrative({ updateRef }) {
  const boxRefs = useRef([])

  useEffect(() => {
    updateRef.current = (progress) => {
      BOXES.forEach((box, idx) => {
        const el = boxRefs.current[idx]
        if (!el) return
        const fadeFrac = Math.max(0, Math.min(1, (progress - (box.activation - 0.04)) / 0.05))
        el.style.opacity = fadeFrac
        el.style.transform = `translateY(${(1 - fadeFrac) * 20}px)`
      })
    }
  }, [updateRef])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {BOXES.map((box, idx) => {
        const topVh = box.activation * 1000 + 20
        return (
          <div
            key={box.id}
            ref={el => { boxRefs.current[idx] = el }}
            style={{
              position: 'absolute',
              top: `${topVh}vh`,
              left: '16px',
              right: '24px',
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            <div style={{
              background: '#1D2CF3',
              color: '#fff',
              borderRadius: '0',
              padding: '20px 22px',
              fontFamily: "'ABeeZee', sans-serif",
              maxWidth: '92%',
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '10px',
                lineHeight: 1.2,
                fontFamily: "'ABeeZee', sans-serif",
              }}>
                {box.title}
              </h3>
              <p style={{ fontSize: '17px', lineHeight: 1.55 }}>
                {box.text}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
