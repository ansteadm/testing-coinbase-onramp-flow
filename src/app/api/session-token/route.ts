import { NextRequest, NextResponse } from 'next/server';

// Try to import CDP SDK for proper JWT generation
let generateJwt: any = null;
try {
  const cdpAuth = require('@coinbase/cdp-sdk/auth');
  generateJwt = cdpAuth.generateJwt;
} catch (error) {
  console.log('CDP SDK not available, using fallback authentication');
}

export async function POST(request: NextRequest) {
  try {
    const { addresses } = await request.json();

    if (!addresses || typeof addresses !== 'object') {
      return NextResponse.json(
        { error: 'Invalid addresses parameter' },
        { status: 400 }
      );
    }

    const projectId = process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID;
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Missing Coinbase project ID' },
        { status: 500 }
      );
    }

    // Try CDP API v2 with proper JWT authentication using CDP SDK
    if (generateJwt) {
      try {
        const keyName = process.env.COINBASE_API_KEY_ID;
        const keySecret = process.env.COINBASE_API_SECRET;
        
        if (keyName && keySecret) {
          console.log('Attempting CDP API v2 session token creation with CDP SDK...');
          
          const requestPath = '/onramp/v1/buy/session';
          const requestHost = 'api.developer.coinbase.com';
          const method = 'POST';
          const requestBody = JSON.stringify({
            appId: projectId,
            destinationWallet: {
              address: Object.keys(addresses)[0],
              blockchains: addresses[Object.keys(addresses)[0]]
            }
          });

          // Generate JWT using CDP SDK
          const jwt = await generateJwt({
            apiKeyId: keyName,
            apiKeySecret: keySecret,
            requestMethod: method,
            requestHost: requestHost,
            requestPath: requestPath,
            requestBody: requestBody,
            expiresIn: 120
          });

          const sessionResponse = await fetch(`https://${requestHost}${requestPath}`, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`,
            },
            body: requestBody,
          });

          console.log(`CDP API v2 response: ${sessionResponse.status} ${sessionResponse.statusText}`);

          if (sessionResponse.ok) {
            const sessionData = await sessionResponse.json();
            console.log('CDP API v2 session token created successfully');
            return NextResponse.json({ 
              sessionToken: sessionData.sessionToken || sessionData.token
            });
          } else {
            const errorText = await sessionResponse.text();
            console.log('CDP API v2 error:', errorText);
          }
        }
      } catch (cdpError) {
        console.error('CDP API v2 SDK error:', cdpError);
      }
    }

    // Try OnchainKit API approach
    const onchainKitApiKey = process.env.ONCHAINKIT_API_KEY;
    if (onchainKitApiKey) {
      try {
        console.log('Trying OnchainKit API approach...');
        
        const onchainResponse = await fetch('https://api.developer.coinbase.com/onramp/v1/buy/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${onchainKitApiKey}`,
          },
          body: JSON.stringify({
            appId: projectId,
            destinationWallet: {
              address: Object.keys(addresses)[0],
              blockchains: addresses[Object.keys(addresses)[0]]
            }
          }),
        });

        if (onchainResponse.ok) {
          const sessionData = await onchainResponse.json();
          console.log('OnchainKit session token created successfully');
          return NextResponse.json({ 
            sessionToken: sessionData.sessionToken || sessionData.token
          });
        } else {
          const errorText = await onchainResponse.text();
          console.log('OnchainKit API error:', errorText);
        }
      } catch (onchainError) {
        console.error('OnchainKit API error:', onchainError);
      }
    }

    // Fallback to direct project ID approach
    console.log('All session token methods failed, using direct project ID approach');
    return NextResponse.json({ 
      useProjectId: true,
      projectId: projectId
    });

  } catch (error) {
    console.error('Session token creation error:', error);
    
    // Fallback to project ID approach
    const projectId = process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID;
    return NextResponse.json({ 
      useProjectId: true,
      projectId: projectId
    });
  }
}
