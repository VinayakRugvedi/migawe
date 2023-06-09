import { Logo512 } from 'assets'

const AboutSection = () => {
  return (
    <section className='mx-auto max-w-7xl mt-16 px-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
        <div>
          <h3 className='text-4xl font-medium mb-8'>About Migawe</h3>
          <p className='text-md md:text-xl'>
            Migawe is a platform that offers a diverse set of on-chain and peer-to-peer games within
            the web3 ecosystem. The aim of Migawe is to drive adoption of web3, bring together
            brands and users, and enhance engagement on decentralized applications (dapps), all of
            this with an addictive setup.
          </p>

          <div className='mt-8'>
            <h4 className='text-2xl font-medium'>How is it an addictive setup?</h4>
            <p className='italic font-medium'>
              A player can choose to play either native games or branded games.
            </p>
            <p className='text-md md:text-xl mt-2'>
              Each game comes with an implementation of reward pool(s) within it. These reward pools
              are populated by players(if needed, by brands as well) before the beginning of the
              game.
            </p>
            <p className='text-md md:text-xl mt-2'>
              At the end of a game, the winner receives the (aggregated value of the reward pool -
              20%)
            </p>
            <p className='italic font-medium'>
              The deducted 20% is added to our stakeholders pool, which is basically our revenue and
              is used to support development, reward the community, to encourage loyalty, etc.
            </p>
          </div>

          <div className='mt-8'>
            <h4 className='text-2xl font-medium'>How are brands and users united?</h4>
            <p className='text-md md:text-xl mt-2'>
              Brands can select a game and brand it, from transforming the entire game environment
              to configuring the flow and reward pool(s), thereby aligning with their branding and
              providing players with an immersive branded experience.
            </p>
            <p className='text-md md:text-xl mt-2'>
              Winners of branded games can receive digital assets such as NFTs, which can later be
              redeemed with the respective brands, similar to coupon codes.
            </p>
          </div>

          <div className='mt-8'>
            <h4 className='text-2xl font-medium'>How is engagement enhanced on dApps?</h4>
            <p className='italic font-medium'>We call this plug and play</p>
            <p className='text-md md:text-xl mt-2'>
              dApps can pick any of the native games and plug it on their platform. dApp operators
              will have control over configuring the game flow, reward pool(s), and establishing
              constraints, all while branding the game. This allows dapps to offer engaging
              experiences to users on their platform without any context switch.
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <img
              src={Logo512}
              alt='Migawe Logo'
              className='w-48 animate-[spin_90s_ease-in-out_infinite] drop-shadow-[0_0px_12px_hsl(var(--p))]'
            />
            <p className='w-2/3 mt-6 font-bold italic drop-shadow-[0_0px_10px_hsl(var(--p))]'>
              &quot;By combining games, rewards, branding opportunities, and engagement enhancement
              on dapps, Migawe aims to create a thriving ecosystem within the web3 space&quot;
            </p>
          </div>

          <div className='mt-16 flex flex-col justify-center'>
            <h4 className='text-2xl font-medium'>Can I be a part of Migawe&apos;s ecosystem?</h4>
            <p className='italic font-medium'>We will never say NO</p>
            <p className='text-md md:text-xl mt-2'>
              Migawe allows brands and game studios to easily become part of the ecosystem by
              leveraging its infrastructure and system models.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
